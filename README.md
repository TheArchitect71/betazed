# Betazed — offline Nest API

The existing Nest backend and MongoDB user model are retained. Use Node **26.10.0** (`.nvmrc`) and the mission MongoDB **9.0.2** instance on localhost:27018.

## Run locally

Start MongoDB in one terminal:

```sh
cd "/Users/thearchitect/Documents/Projects/Web Development"
./.dependency-migration/start-mongodb.sh
```

In another terminal:

```sh
cd "/Users/thearchitect/Documents/Projects/Web Development/Backend Samples/betazed"
export PATH="/Users/thearchitect/Documents/Projects/Web Development/.dependency-migration/runtimes/node-v26.10.0-darwin-arm64/bin:$PATH"
npm ci
npm run build
npm run start:prod
```

The API listens at `http://127.0.0.1:3000`. Both commands stay in the foreground; stop either with **Ctrl+C**. Development watch mode is `npm run start:dev`.

Ignored, private `.env.local` supplies `MONGODB_URI`, `JWT_SECRET`, and optional `PORT`. Legacy `.env` is preserved but not loaded. Only `mongodb://` localhost/127.0.0.1 URLs are accepted, before connecting. No Atlas account or internet connection is needed after dependencies are installed. There was no local application dataset; no persistent sample users were seeded.

## Existing API features

- `POST /users`: JSON `{ "name": "Example", "age": 25 }`; returns `{ "id": "..." }`. Legacy `price` is accepted as an alias for age.
- To create a login-capable user, include `username` and `password` (at least eight characters). Passwords are hashed; duplicate usernames return 409.
- `POST /auth/login`: JSON `username` and `password`; returns `access_token`.
- `GET /profile`: use `Authorization: Bearer <access_token>`; returns the authenticated MongoDB user ID and username.

The original sample has no frontend. Missing user-service methods, module exports and request-scope injection were repaired so its existing login/profile flow works.

## Validation

```sh
npm run build
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm audit
```

Six unit tests and four integration tests cover validation, age/price compatibility, password hashing, duplicate usernames, login and protected profiles. Integration tests use and delete a distinct local test database; they do not modify application users.

## Versions and compatibility

Nest core/platform/testing **12.1.2**, CLI **12.0.8**, Mongoose **9.10.3**, Passport **0.7.0**, JWT module **12.0.2**, Jest **30.5.2**, TypeScript **6.0.3**. TypeScript is held because typescript-eslint 8.71 requires `<6.1` and ts-jest 29.4.14 requires `<7`. Nest 12 is ESM; CommonJS application output is retained using NodeNext resolution and modern Node require(esm). Jest requires Node >=24.9 plus `--experimental-vm-modules`; the npm test scripts include this flag. The pinned Node 26.10.0 satisfies these constraints. The VM experimental warning is expected.

Official references: [Nest migration guide](https://docs.nestjs.com/migration-guide), [Nest MongoDB integration](https://docs.nestjs.com/techniques/mongodb), [Jest ESM runtime](https://jestjs.io/docs/ecmascript-modules).

All install/build/type/lint/unit/integration checks passed after a clean install. npm audit reported zero known vulnerabilities. Source backups are stored under the mission `.dependency-migration/baseline-diffs` directory. All changes remain local.
