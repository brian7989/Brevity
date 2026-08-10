# Brevity

Brevity is a once-a-day writing game: identify what matters, prioritize it, then compress it without losing the point. Players get one submission, a Signal and Clarity grade, deterministic word/compression statistics, concise feedback, and a reference answer.

Korean and English challenges are included. Korean is the product's primary editorial language.

## Run locally

Requires Node 22+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `AI_GATEWAY_API_KEY` for semantic scoring through Vercel AI Gateway. `AI_MODEL` defaults to `openai/gpt-5.4-mini`. AI configuration is required to submit; Brevity never presents heuristic scoring as semantic evaluation.

## Architecture

`src/features` owns challenge selection, repository access, scoring, and results. `content` owns language-specific editorial JSON. `src/lib/ai` is the provider boundary; `src/lib/storage` owns validated local player state. The API route only translates HTTP into `scoreSubmission`. Challenges are validated repository data and never generated on the request path.

Every source directory has an `index.ts`. Imports crossing a directory use its barrel; imports crossing a feature use the feature's public root. Internal files follow external imports, internal imports, types, constants, primary export, private helpers. Component files contain no explanatory comments.

## Challenge model and scoring

Each challenge has an ID/date, 60–120 word passage, weighted semantic key points, reference answer, and difficulty. Zod validates the content at module load. Signal weights essential meaning most heavily; Clarity judges immediate comprehension and preserved relationships. Brevity is deterministic and never rescues a shallow answer: meaning first, words second.

Generate reviewable JSON fixtures offline with:

```bash
npm run generate:challenges -- --count 30
```

The generator requires the same AI environment variables and writes one stable, diff-friendly file per challenge to `generated-challenges/`.

## Quality and deployment

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

With AI credentials configured, run the billable live calibration suite with `npm run test:ai`.

Deterministic tests cover schemas, calibration completeness, result copy, word/compression logic, and streak persistence. Live model calibration runs separately because it is nondeterministic and billable. `evals/scoring` contains only the JSON grading datasets; their schemas, loaders, and test runners live in `tests/scoring`. Vercel Web Analytics records anonymous challenge-opened, submitted, completed, and next-day-return events; custom events require a Vercel Pro or Enterprise plan. Deploy as a standard Next.js application on Vercel, enable Web Analytics, and configure the AI variables there. No database is required.

Before making a public deployment, set an AI Gateway spend limit and rate-limit `POST /api/score` in Vercel Firewall. The API key remains server-only and must never use a `NEXT_PUBLIC_` prefix.

Every pull request and push to `main` runs formatting, lint, architecture checks, typechecking, deterministic tests, and a production build in GitHub Actions. Vercel should require this check before promoting a Git commit to production.

## License

[MIT](./LICENSE)
