import "./crons.ts";
import { Schema } from "effect";
import { Hono } from "hono";
import * as T from "./types.ts";

const kv = await Deno.openKv();

const app = new Hono();

app.get("/all", async (ctx) => {
	const content = kv.list({ prefix: ["articles"] });

	const allArticles: T.NewsItem[] = [];

	for await (const article of content) {
		const parsedArticle = Schema.decodeSync(T.NewsItem)(
			JSON.parse(article.value as string),
		);
		allArticles.push(parsedArticle);
	}

	return ctx.json({
		data: allArticles,
	});
});

Deno.serve(app.fetch);
