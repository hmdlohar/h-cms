#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Get package name from command line argument
const packageName = process.argv[2];

if (!packageName) {
    console.error('Please provide a package name');
    process.exit(1);
}

// Create directory
const pluginDir = path.join(process.cwd(), packageName);
fs.mkdirSync(pluginDir);
fs.mkdirSync(path.join(pluginDir, 'src'));
fs.mkdirSync(path.join(pluginDir, 'src/components'));

// Create package.json
const packageJson = {
    "name": `hcms-plugin-${packageName}`,
    "version": "1.0.0",
    "main": "dist/index.js",
    "module": "dist/index.esm.js",
    "types": "dist/index.d.ts",
    "license": "MIT",
    "scripts": {
        "build": "rollup -c",
        "watch": "rollup -c -w"
    },
    "dependencies": {
        "hcms-core": "latest",
        "knex": "3.1.0",
        "react": "^18.3.1"
    },
    "devDependencies": {
        "@babel/core": "^7.17.9",
        "tslib": "^2.8.1",
        "@babel/preset-env": "^7.16.11",
        "@babel/preset-react": "^7.16.7",
        "@rollup/plugin-commonjs": "^28.0.1",
        "@rollup/plugin-node-resolve": "^15.3.0",
        "@rollup/plugin-typescript": "^12.1.1",
        "@types/react": "18.0.21",
        "rollup": "^2.70.2",
        "rollup-plugin-babel": "^4.4.0",
        "rollup-plugin-dts": "^4.2.1",
        "rollup-plugin-jsx": "^1.0.3",
        "typescript": "^5.6.3"
    }
};

// Create rollup.config.js
const rollupConfig = `import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import babel from "rollup-plugin-babel";



export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/env", "@babel/preset-react"],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: ["react"],
  },
  {
    input: ["src/index.ts"],
    output: [{ file: "dist/index.d.ts", format: "cjs" }],
    plugins: [dts()]
  },
];`;

// Create tsconfig.json
const tsConfig = {
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "lib": ["ES2019", "DOM"],
        "typeRoots": [],
        "esModuleInterop": true,
        "jsx": "react",
        "moduleResolution": "Node",
        "module": "ES2020"
    },
    "include": ["src/**/*.ts", "src/**/*.tsx"],
    "exclude": ["node_modules", "dist"]
};

// Create index.ts with example
const indexTs = `import { ICollection } from "hcms-core";
import { Knex } from "knex";
import React from "react";

export function register(): { [collectionID: string]: ICollection } {
  return {
    // Add your collection here
    ${packageName}: {
      collectionID: "${packageName}",
      name: "${packageName.charAt(0).toUpperCase() + packageName.slice(1)}",
      methods: {
        // Add your methods here
        // Example:
        // getData: async (ctx) => {
        //   return { message: "Hello from ${packageName}!" };
        // }
      },
      menuItems: {
        ${packageName}: {
          label: "${packageName.charAt(0).toUpperCase() + packageName.slice(1)}",
          icon: "dashboard", // Material icon name
          component: React.lazy(() => import("./components/MainPage")),
        },
      },
      migrations: {
        // Add your migrations here
        // Example:
        // createTable: {
        //   up: async (db: Knex) => {
        //     await db.schema.createTable("${packageName}", (table) => {
        //       table.increments("id").primary();
        //       table.string("name");
        //     });
        //   },
        //   down: async (db: Knex) => {
        //     await db.schema.dropTable("${packageName}");
        //   },
        // },
      },
    },
  };
}`;

// Create example React component
const mainPageComponent = `import React from "react";

import { ClientSDK } from "hcms-core";

interface IMainPageProps {}

export default function MainPage(props: IMainPageProps) {
  return (
    <div>
      <h1>${packageName.charAt(0).toUpperCase() + packageName.slice(1)} Plugin</h1>
     
    </div>
  );
}`;

// Create .gitignore
const gitignore = `dist/
*.tsbuildinfo
node_modules/
*.cache`;


// Write files
fs.writeFileSync(path.join(pluginDir, 'package.json'), JSON.stringify(packageJson, null, 2));
fs.writeFileSync(path.join(pluginDir, 'rollup.config.js'), rollupConfig);
fs.writeFileSync(path.join(pluginDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
fs.writeFileSync(path.join(pluginDir, 'src/index.ts'), indexTs);
fs.writeFileSync(path.join(pluginDir, 'src/components/MainPage.tsx'), mainPageComponent);
fs.writeFileSync(path.join(pluginDir, '.gitignore'), gitignore);

console.log(`HCMS plugin '${packageName}' created successfully!`);
console.log(`\nNext steps:`);
console.log(`1. cd ${packageName}`);
console.log(`2. npm install`);
console.log(`3. npm run build`);