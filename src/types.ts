import { Schema } from 'effect';

export class NewsItem extends Schema.Class<NewsItem>('NewsItem')({
  title: Schema.String,
  url: Schema.String,
  publishedAt: Schema.String,
  description: Schema.String,
  source: Schema.String,
}) {}

export interface SourceConfig {
  name: string;
  type: 'rss' | 'json';
  url: string;
}
