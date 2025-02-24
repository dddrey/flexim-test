# Project Setup

## Note
- Node.js 20, npm 10.7.0 is used for this project.
- You also need to have MongoDB, feel free to use `docker compose up --build` in the root directory to start it in Docker.
- run `./setup.sh` to install dependencies & create sample `.env.local` files
- modify `.env.local` files as you need

## Backend
1. Seed the database:
```sh

npm run seed

```

2. Start the development server:
```sh

npm run dev

```
  
## Frontend
1. Run codegen:
```sh

npm run codegen

```

2. Start the development server:
```sh

npm run dev

```