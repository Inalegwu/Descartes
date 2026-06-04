import { Effect, pipe } from "effect";
import { runnable } from "./Cli.ts";

Deno.cron("fetch-and-process-news", "0 15 */3 * *", async () =>
	pipe(await Effect.runPromise(runnable), (data) => {
		console.log(`${data.summary} on ${data.fetchedAt}`);
		if (data.articles.length === 0) return;
		// TODO: Save to supabase
	}),
);

// TODO: cron to reach out to AI model to write out case study following our format
// TODO: take this outputted case study and write it to a markdown
// TODO: file in the github repo and trigger a redeploy on vercel
Deno.cron("generate-case-studies", "", async () => {});
