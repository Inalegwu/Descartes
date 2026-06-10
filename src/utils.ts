import { Array, Effect, pipe, Schedule } from 'effect';
import { toLowerCase } from 'effect/String';
import { HttpClient } from 'effect/unstable/http/HttpClient';
import { XMLParser } from 'fast-xml-parser';
import * as Constants from './constants.ts';
import { NewsItem } from './types.ts';

export const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .trim();

export const fetchHttp = (url: string) =>
  HttpClient.use((client) =>
    client.get(url).pipe(
      Effect.timeout(12_000),
      Effect.retry(Schedule.spaced(1_000) && Schedule.recurs(2)),
      Effect.flatMap((res) => res.text),
      Effect.catch(() => Effect.succeed('')),
    )
  );

export const parseXML = (xml: string): Record<string, any> =>
  pipe(new XMLParser({ ignoreAttributes: false }), (p) => p.parse(xml));

export const extractRSSItems = (parsed: Record<string, any>): any[] => {
  try {
    return Array.ensure(parsed.rss?.channel?.item ?? []);
  } catch {
    return [];
  }
};

export const rssItemToNewsItem = (
  item: any,
  source: string,
): NewsItem | null => {
  const title = item.title?.toString() ?? '';
  const url = item.link?.toString() ?? '';
  if (!title || !url) return null;
  const publishedAt = item.pubDate?.toString() ?? new Date().toISOString();
  const description = stripHtml(item.description?.toString() ?? '');

  return new NewsItem({
    title,
    url,
    publishedAt,
    description,
    source,
    snippet: description.substring(0, 200),
  });
};

export const isRelevant = (item: NewsItem): boolean => {
  const text = toLowerCase(`${item.title} ${item.description}`);

  const hasAfrica = Constants.AFRICA_KEYWORDS.some((kw) => text.includes(kw));
  if (!hasAfrica) return false;

  const hasSME = Constants.SME_KEYWORDS.some((kw) => text.includes(kw));
  if (!hasSME) return false;

  const hasFunding = Constants.FINANCING_KEYWORDS.some((kw) =>
    text.includes(kw)
  );
  if (!hasFunding) return false;

  const isFromCanada = Constants.CANADA_KEYWORDS.some((kw) =>
    text.includes(kw)
  );

  if (!isFromCanada) return false;

  const debtHits =
    Constants.DEBT_EXCLUDE.filter((kw) => text.includes(kw)).length;
  if (debtHits >= 2) return false;

  return true;
};
