import { Array, Effect, pipe } from 'effect';
import { FetchHttpClient } from 'effect/unstable/http';
import * as Constants from './constants.ts';
import { NewsItem, type SourceConfig } from './types.ts';
import * as Utils from './utils.ts';

const fetchSource = (source: SourceConfig) =>
  Effect.gen(function* () {
    const raw = yield* Utils.fetchHttp(source.url);
    if (!raw) return [];

    if (source.type === 'rss') {
      const parsed = Utils.parseXML(raw);
      const items = Utils.extractRSSItems(parsed);
      return items
        .map((item) => Utils.rssItemToNewsItem(item, source.name))
        .filter((x): x is NewsItem => x !== null)
        .filter(Utils.isRelevant);
    }

    try {
      const json = JSON.parse(raw);
      const articles = json.articles ?? json.items ?? [];
      return (
        articles
          .map((a: any) => {
            const title = a.title?.toString() ?? '';
            const url = a.url?.toString() ?? a.link?.toString() ?? '';
            if (!title || !url) return null;
            return new NewsItem({
              title,
              url,
              publishedAt: a.publishedAt ?? a.date ?? new Date().toISOString(),
              description: Utils.stripHtml(a.description ?? a.summary ?? ''),
              source: source.name,
            });
          })
          // @ts-expect-error
          .filter((x): x is NewsItem => x !== null)
          .filter(Utils.isRelevant) as NewsItem[]
      );
    } catch {
      return [];
    }
  });

const fetchAllSources = () =>
  Effect.all(Constants.SOURCES.map(fetchSource), { concurrency: 3 }).pipe(
    Effect.map((results) => Array.flatten(results)),
    Effect.map((items) => Array.dedupeWith(items, (a, b) => a.url === b.url)),
    Effect.map((items) =>
      items.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
    ),
  );

export const program = Effect.gen(function* () {
  yield* Effect.log(
    'Searching for recent non‑debt SME investments in Africa...',
  );
  const items = yield* fetchAllSources();
  const output = {
    summary: `${items.length} relevant articles found`,
    fetchedAt: new Date().toISOString(),
    articles: items.map((item) => ({
      title: item.title,
      source: item.source,
      published: item.publishedAt,
      url: item.url,
      snippet: item.description.substring(0, 200),
    })),
  };
  // yield* Effect.log(JSON.stringify(output, null, 2));

  // yield* Effect.logInfo(JSON.stringify(output.articles.map((art) => art.url)));

  return output;
});

export const runnable = pipe(program, Effect.provide(FetchHttpClient.layer));
