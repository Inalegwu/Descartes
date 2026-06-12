import { Schema } from 'effect';
import { Hono } from 'hono';
import './crons.ts';
import * as T from './types.ts';

const kv = await Deno.openKv();

const app = new Hono();

app.use('*', async (c, next) => {
  c.setRenderer((content) => {
    return c.html(
      `<html>
    <head>
    <title>Descartes Preview</title>
      <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
    <body class="bg-neutral-100 text-neutral-950 overflow-hidden">
      <div className="w-3/6 mx-auto h-screen overflow-hidden overflow-y-scroll">
      ${content}
      </div>
    </body>
    </html>`,
    );
  });
  await next();
});

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

app.get('/see', async (ctx) => {
  const content = kv.list({ prefix: ['articles'] });

  const allArticles: T.NewsItem[] = [];

  for await (const article of content) {
    const parsedArticle = Schema.decodeSync(T.NewsItem, {
      onExcessProperty: 'ignore',
      concurrency: 2,
    })(JSON.parse(article.value as string));
    allArticles.push(parsedArticle);
  }

  return ctx.render(`
    ${
    allArticles.map((art) => (
      `<p>${art.title}</p>
        <p>${art.description}</p>
        <p>${art.snippet}</p>
        <p>${art.url}</p>
      `
    ))
  }  
  `);
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
