import { Effect, pipe } from 'effect';
import { runnable } from './Cli.ts';

const kv = await Deno.openKv();

Deno.cron(
  'fetch-and-process-news',
  '0 15 */3 * *',
  async () =>
    pipe(await Effect.runPromise(runnable), (data) => {
      console.log(`Successfully processed ${data.articles.length} articles`);
      if (data.articles.length === 0) return;
      kv.set([new Date().toString()], JSON.stringify(data));
    }),
);

// TODO: cron to reach out to AI model to write out case study following our format

// TODO: cron to take this outputted case study and write it to a markdown
// TODO: file in the github repo and trigger a redeploy on vercel
