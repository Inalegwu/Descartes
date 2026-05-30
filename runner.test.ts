import { Effect, pipe } from "effect";
import { runnable } from "./src/Cli.ts";

pipe(await Effect.runPromise(runnable), (result) => {
	console.log(result);
});
