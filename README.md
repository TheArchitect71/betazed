# Betazed login tutorial (offline)

This checkout retains the original in-memory Nest tutorial, distinct from the MongoDB application under `Backend Samples/betazed`. It has no active database connection or frontend. Unused TypeORM dependencies were removed; the original commented connection and `ormconfig.json` are retained as historical references.

## Run

```sh
nvm use
npm ci
npm run setup:local
npm run build
npm run start:prod
```

The process stays in the foreground on `http://127.0.0.1:3001`; stop with **Ctrl+C**. Watch mode: `npm run start:dev`. `setup:local` creates an ignored private configuration with a random secret, preserving an existing file. Ignored `.env.local` supplies `JWT_SECRET` and `PORT`.

`POST /auth/login` accepts JSON username/password. Original tutorial credentials are preserved: john/changeme, chris/secret, maria/guess. Passwords are now held as bcrypt hashes and omitted from authentication results. JWT subjects retain numeric tutorial user IDs; tokens expire after 60 seconds. These are public demonstration credentials, not private application accounts.

## Checks

`npm run build`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`, and `npm audit`.

Four unit tests and four HTTP integration tests verify all tutorial credentials, incorrect/missing credentials, password omission and JWT claims. No MongoDB or remote services are used.

Nest **12.1.2**, CLI **12.0.8**, Jest **30.5.2**, TypeScript **6.0.3**, Node **26.10.0**. TypeScript held by typescript-eslint `<6.1` and ts-jest `<7`. Nest 12 uses ESM; NodeNext CommonJS output remains supported. Jest needs Node >=24.9 and experimental VM modules (included in npm scripts). See the [Nest migration guide](https://docs.nestjs.com/migration-guide) and [Jest ESM documentation](https://jestjs.io/docs/ecmascript-modules).

The pre-migration source/lockfile snapshot is saved under `.dependency-migration/baseline-diffs/betazed-clone-before-nest12.tar.gz`.
