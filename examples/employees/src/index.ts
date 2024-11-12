import { createDefaultCURD, ICollection } from "hcms-core";
import { Knex } from "knex";

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
          type: "CRUDTable",
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
        },
      },
      migrations: {
        createEmployeeTable: {
          up: async (db: Knex) => {
            await db.schema.createTable("employee", (table) => {
              table.increments("id").primary();
              table.string("name").notNullable();
              table.string("email").notNullable();
              table.string("position");
              table.decimal("salary").notNullable();
              table.text("description");
              table.timestamps(true, true);
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
