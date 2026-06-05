import { Schema } from 'effect';
import { Hono } from 'hono';
import './crons.ts';
import * as T from './types.ts';

const kv = await Deno.openKv();

const app = new Hono();

app.get('/all', async (ctx) => {
  const content = kv.list({ prefix: ['articles'] });

  const allArticles: T.NewsItem[] = [];

  for await (const article of content) {
    const parsedArticle = Schema.decodeSync(T.NewsItem, {
      onExcessProperty: 'ignore',
      concurrency: 2,
    })(JSON.parse(article.value as string));
    allArticles.push(parsedArticle);
  }

  return ctx.json({
    data: allArticles,
  });
});

app.get('/tags', (ctx) => {
  const url = ctx.req.query('url');

  if (!url) {
    ctx.json({
      message: 'No URL provided for tagging',
    });
  }

  return ctx.json({
    message: 'success',
  });
});

app.get('/', (c) =>
  c.json({
    message: 'Hello World',
  }));

Deno.serve(app.fetch);
