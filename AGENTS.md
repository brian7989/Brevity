# Brevity engineering contract

- Optimize the daily loop: read, write, submit once, understand the result, return tomorrow.
- Prefer consistency over terseness. Organize source code by feature/domain.
- Every source directory contains an `index.ts`. Cross-directory imports use that directory's barrel; cross-feature imports use the feature root.
- Files follow: external imports, internal imports, types, constants, primary export, private helpers. Components use imports, props, component, private helpers.
- Split components around 150 lines when responsibilities can be named. Never add explanatory comments to component implementation files.
- JSDoc is reserved for public contracts, invariants, and non-obvious reasoning. Never narrate code.
- TypeScript remains strict. Do not use `any`. Derive types from Zod schemas when practical.
- Validate repository content, API input/output, AI output, and persisted state with Zod.
- Check mature focused libraries before writing generic infrastructure, but do not add dependencies for trivial behavior.
- Abstract domain concepts, not repeated syntax. Prefer concrete names; avoid speculative managers, handlers, processors, repositories, databases, and account infrastructure.
- Route handlers stay thin: transport → domain service → AI boundary. Provider details never enter UI code.
- Preserve the no-account, no-database, pre-generated-content architecture unless the product contract changes.
- Before handoff, format, lint, typecheck, test, and production-build. Inspect barrels, component comments, and mobile/desktop behavior.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
