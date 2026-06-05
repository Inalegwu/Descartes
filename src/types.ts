import { Schema } from 'effect';

export class NewsItem extends Schema.Class<NewsItem>('NewsItem')({
  title: Schema.String,
  url: Schema.String,
  publishedAt: Schema.String,
  description: Schema.String,
  source: Schema.String,
  snippet: Schema.String,
}) {}

// export interface SourceConfig {
//   name: string;
//   type: 'rss' | 'json';
//   url: string;
// }

export class SourceConfig extends Schema.Class<SourceConfig>('SourceConfig')({
  name: Schema.String,
  type: Schema.Literals(['rss', 'json']),
  url: Schema.String,
}) {}

// export type SourceConfig=typeof SourceConfig.Type;
