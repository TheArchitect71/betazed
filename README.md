# Betazed — login tutorial

A small NestJS authentication tutorial using in-memory users and short-lived JWTs. It demonstrates password verification and token issuance without a database or frontend. For persistent MongoDB users, see [Betazed MongoDB](https://github.com/TheArchitect71/betazed-mongodb).

## Run locally

Use the Node version in `.nvmrc` (currently 26.10.0) and npm. From the repository root:

```sh
npm ci
npm run setup:local
npm run build
npm run start:prod
```

The API runs at [http://127.0.0.1:3001](http://127.0.0.1:3001). Keep it in the foreground; stop with **Ctrl+C**. Setup creates an ignored `.env.local` with a random JWT secret and preserves an existing configuration.

## Try the login endpoint

```sh
curl http://127.0.0.1:3001/auth/login   -H 'Content-Type: application/json'   -d '{"username":"john","password":"changeme"}'
```

Public tutorial credentials are `john/changeme`, `chris/secret`, and `maria/guess`. Tokens expire after 60 seconds. These are demonstration users, not production accounts; no records are persisted.

## Development

`npm run start:dev` starts watch mode. Checks: `npm run build`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run test:e2e`. Historical TypeORM configuration is inactive; no database connection is required.
