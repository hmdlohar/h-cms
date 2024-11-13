# HCMS - Headless Content Management System

HCMS is a flexible, plugin-based content management system that allows you to extend functionality through custom plugins. The system provides a robust admin interface for managing content while maintaining a clean core architecture.

## Core Features

- Plugin-based architecture for extensibility
- Built-in collections for Posts and Pages
- Default CRUD operations
- Rich text editing support
- Database migrations system
- Material UI-based admin interface
- Built with Next.js App Router

## Project Structure

The project uses a monorepo structure with two main packages:

1. `hcms-core`: Core package providing plugin development capabilities
2. `cms-admin-ui`: Next.js based admin interface

## Core Concepts

### Collections

Collections are the main building blocks of HCMS. A collection represents an entity (e.g., Posts, Pages) and defines:

- Methods (API endpoints)
- Database migrations
- Menu items and UI components

Example collection structure:

```typescript:packages/core/src/collection.ts
export interface ICollection {
  collectionID: string;
  name: string;
  methods: {
    [methodName: string]: ICollectionMethod;
  };
  migrations?: {
    [migrationName: string]: {
      up: (db: Knex) => Promise<void>;
      down: (db: Knex) => Promise<void>;
    };
  };
  menuItems?: {
    [menuItemName: string]: ICollectionMenuItem;
  };
}
```

### Methods

Methods provide a way to define server-side functionality similar to RPC. They handle database operations and business logic.

Example of default CRUD methods:

```typescript:packages/core/src/defaultCURD.ts
export function createDefaultCURD(tableName: string): {
  [key: string]: ICollectionMethod;
} {
  return {
    get: {
      fn: async (db: Knex, args: { id: number }) => {
        return db.select("*").from(tableName).where("id", args.id).first();
      },
    },
    list: {
      fn: async (db: Knex) => {
        return db.select("*").from(tableName);
      },
    },
    // ... other CRUD methods
  };
}
```

### Client SDK

The ClientSDK provides a clean interface for making API calls from the frontend:

```typescript:packages/core/src/ClientSDK.ts
export class ClientSDK {
  static async call(io: { collection: string; method: string; args?: any }) {
    const response = await fetch(`/api/cms`, {
      method: "POST",
      body: JSON.stringify(io),
    });
    let result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.result;
  }
  // ... other methods
}
```

## Creating a Plugin

1. Generate plugin scaffold:

```bash
npx hcms-core my-plugin
```

2. Install dependencies:

```bash
cd my-plugin
yarn install
```

3. Plugin structure:

```typescript:examples/employees/src/index.ts
import { createDefaultCURD, ICollection } from "hcms-core";

export function register(): { [collectionID: string]: ICollection } {
  return {
    employee: {
      collectionID: "employee",
      name: "Employee",
      methods: {
        ...createDefaultCURD("employee"),
      },
      menuItems: {
        employee: {
          label: "Employee",
          CRUDSchema: {
            columns: {
              name: { label: "Name", type: "string", required: true },
              // ... other columns
            },
          },
        },
      },
      migrations: {
        createEmployeeTable: {
          up: async (db: Knex) => {
            await db.schema.createTable("employee", (table) => {
              table.increments("id").primary();
              // ... table definition
            });
          },
          down: async (db: Knex) => {
            await db.schema.dropTable("employee");
          },
        },
      },
    },
  };
}
```

### Plugin Development Options

1. **Local Development**:

```bash
# In plugin directory
yarn link
yarn watch

# In cms-admin-ui directory
yarn link "hcms-plugin-myplugin"
```

2. **Production**:

- Publish to npm
- Install via package manager

## Using Plugins

### 1. Installing Plugins

Plugins can be installed in three ways:

```bash
# From NPM
yarn add hcms-plugin-name

# From GitHub
yarn add github:username/hcms-plugin-name

# Local development
yarn link hcms-plugin-name
```

### 2. Registering Plugins

In your admin UI project, register plugins in the `collections.ts` file:

```javascript
import { register as registerPages } from "./collections/pages";
import { register as registerPosts } from "./collections/posts";
import { register as registerEmployees } from "hcms-plugin-employees";
import { register as registerCounter } from "hcms-plugin-counter";

export const collections = {
  ...registerPages(),
  ...registerPosts(),
  ...registerEmployees(),
  ...registerCounter(),
};
```

### 3. Running Migrations

After adding new plugins, run migrations to set up the database:

```bash
# Development
yarn migrate

# Production migrations run automatically during deployment
```

### 4. Accessing Plugin Data

#### Using Client SDK

```javascript
import { ClientSDK } from 'hcms-core';

// List all items
const items = await ClientSDK.call({
  collection: 'employee',
  method: 'list'
});

// Get single item
const item = await ClientSDK.call({
  collection: 'employee',
  method: 'get',
  args: { id: 1 }
});

// Create item
const newItem = await ClientSDK.call({
  collection: 'employee',
  method: 'create',
  args: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});
```

#### Using React Hooks

```javascript
import { useQuery } from '@tanstack/react-query';
import { ClientSDK } from 'hcms-core';

function EmployeeList() {
  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => ClientSDK.call({
      collection: 'employee',
      method: 'list'
    })
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(employee => (
        <li key={employee.id}>{employee.name}</li>
      ))}
    </ul>
  );
}
```

### 5. Using Custom Plugin Methods

If a plugin provides custom methods, you can call them using the same pattern:

```javascript
// Using custom counter plugin methods
const increaseCount = async () => {
  await ClientSDK.call({
    collection: 'counter',
    method: 'increaseCount'
  });
};

const getCount = async () => {
  const result = await ClientSDK.call({
    collection: 'counter',
    method: 'getCount'
  });
  return result.count;
};
```

### 6. Environment Configuration

Some plugins might require environment variables. Add them to your `.env` file:

```plaintext
# Example plugin configuration
HCMS_PLUGIN_EMPLOYEE_API_KEY=your_api_key
HCMS_PLUGIN_EMPLOYEE_SECRET=your_secret
```

### 7. Plugin Updates

To update plugins:

```bash
# Update specific plugin
yarn upgrade hcms-plugin-name

# Update all plugins
yarn upgrade-interactive --latest
```

Remember to check the plugin's changelog for breaking changes and run migrations after updates.

## Built-in UI Components

### CRUD Table

The system provides a default CRUD interface that can be configured via schema:

```typescript
CRUDSchema: {
            columns: {
              name: {
                label: "Name",
                type: "string",
                required: true,
              },
              email: {
                label: "Email",
                type: "string",
                required: true,
              },
              position: {
                label: "Position",
                type: "string",
                required: false,
              },
              salary: {
                label: "Salary",
                type: "number",
                required: true,
              },
              description: {
                label: "Description",
                type: "richText",
                required: false,
              },
            },
          },
```

### Custom Components

Plugins can provide custom React components instead of using the default CRUD interface.

## Database Support

HCMS uses Knex.js for database operations, supporting:

- PostgreSQL (default)
- MySQL
- SQLite

## Running Migrations

Development:

```bash
yarn migrate
```

Production migrations are automatically handled during deployment.

## Example Plugins

The repository includes two example plugins:

1. **Counter Plugin**: Demonstrates custom UI implementation
2. **Employees Plugin**: Shows default CRUD usage with schema

## Installation

```bash
# Clone repository
git clone https://github.com/hmdlohar/h-cms

# Install dependencies
yarn install

# Build core package
cd packages/core
yarn build

# Start admin UI
cd ../cms-admin-ui
yarn dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

For more detailed documentation and examples, visit the [GitHub repository](https://github.com/hmdlohar/h-cms).
