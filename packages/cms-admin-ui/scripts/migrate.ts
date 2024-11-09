import "dotenv/config";
import { getCollections } from "@/lib/collections";
import { db } from "@/lib/db";

let collections = getCollections();
let objMigration: { [key: string]: any } = {};
for (const collection of Object.values(collections)) {
  objMigration = { ...objMigration, ...collection.migrations };
}
class MyMigrationSource {
  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want,
  // they will be passed as arguments to getMigrationName
  // and getMigration
  getMigrations() {
    // In this example we are just returning migration names
    return Promise.resolve(Object.keys(objMigration));
  }

  getMigrationName(migration: string) {
    return migration;
  }

  getMigration(migration: string) {
    return objMigration[migration];
  }
}

async function main() {
  // pass an instance of your migration source as knex config
  let result = await db.migrate.latest({
    migrationSource: new MyMigrationSource(),
  });
  console.log("Migration done", result);
  process.exit(0);
}

main();
