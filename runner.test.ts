import { Effect, pipe } from "effect";
import { runnable } from "./src/Cli.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

pipe(await Effect.runPromise(runnable), async (result) => {
	for (const article of result.articles) {
		console.log(article);
		await sleep(1500);
	}
});
