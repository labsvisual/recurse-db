# `@labsvisual/recurse-db`

## Introduction
This is the codebase for the pair-programming exercise by RC. This server uses
[`@hapi/hapi`](https://www.npmjs.com/package/@hapi/hapi) as its framework of choice due to its simplicity
and agility.

Considering we will not have a lot of time, unit tests cases have been removed giving way only to
API (integration) test cases for the endpoints covered (get, set).

## Folder Structure
```
.
├── __tests__
├── bin
├── config
├── lib
│   ├── key-value-store
│   └── shared
└── src
    └── api
        ├── get
        ├── set
        └── stats
```

### `__tests__`
The `__tests__` directory contains the test cases written using the [`@hapi/lab`](https://www.npmjs.com/package/@hapi/lab) test framework and the [`@hapi/code`](https://www.npmjs.com/package/@hapi/code)
assertion library.

A script has been included in `package.json` to run all the test cases:
* `npm t` or `npm test`

### `bin`
The `bin` directory contains `recurse-db-init` shell executable which will be linked by `npm` to
`recurse-db` on install. To start the server, one must run `./bin/recurse-db-init`.

### `config`
This project uses [`confidence`](https://github.com/hapipal/confidence) as its configuration provider.
During the assignment, we do not need to change any existing config; but we can add more (flush interval, etc.)

This config file makes use of two directives provided by confidence:
* [`$filter`](https://github.com/hapipal/confidence#filters) &mdash; to do a basic `if-else` based on
certain environment variables; and
* [`$env`](https://github.com/hapipal/confidence#environment-variables) &mdash; to pull values from
the environment.

### `lib`
This directory contains code which is not directly executed; you can imagine this to be a list of
internal packages used by this code base.

* `router.js` &mdash; iterates over the `src/api` directory to find all the controllers and attaches
them to the server object;
* `loggeer.js` &mdash; a simple [`pino`](https://github.com/pinojs/pino) instance;
* `shared` &mdash; contains a singleton-initialized instance of the KeyValue store;
* `key-value-store` &mdash; a simple object-based key-value store;

This is the directory where we will do most of our work.

### `src`
This contains execute-on-start code such as the Hapi server instance; the API definitions, etc.

* `api` &mdash; every child-directory becomes an endpoint (`get` becomes `/get/<path>`); every child
directory **MUST** contain a `routes.js` which exports an array of objects containing
[route definitions](https://hapi.dev/api/?v=18.4.1#-serverrouteroute), and a `controller.js` which
contains the handler code;
* `index.js` &mdash; contains code to setup the Hapi server.

## Prior Art
I did some basic research on how existing KV stores persist data;
* Redis, for example, uses their proprietary file format;
* we can use a similar approach since our state store is basically just a simple JS object;
* probably flush to the file after `n` changes over `m` seconds;
* on startup, we can check if this file exists; if so, read it and load otherwise create a new stream.
