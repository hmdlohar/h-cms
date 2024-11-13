# Getting Started with HCMS Development

## Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager
- PostgreSQL database
- Git

## Initial Setup

1. Clone the repository:

```bash
git clone https://github.com/hmdlohar/h-cms
cd h-cms
```

2. Install dependencies:

```bash
yarn install
```

3. Build the core library:

```bash
yarn build:lib
```

OR Watch the core library:

```bash
yarn watch:lib
```

4. Set up environment variables:
   Create a .env file in packages/cms-admin-ui directory:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/hcms"
```

5. Run Admin UI Next.js server:

```bash
cd packages/cms-admin-ui
yarn dev
```


Run Migrations:

```bash
yarn migrate
```
