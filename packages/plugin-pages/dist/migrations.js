"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations = void 0;
exports.migrations = {
    create_pages: {
        up: function (db) {
            return db.schema.createTable("pages", function (table) {
                table.increments("id").primary();
                table.string("title").notNullable();
                table.string("slug").notNullable().unique();
                table.text("bodyhtml").notNullable();
                table.timestamps(true, true);
            });
        },
        down: function (db) { return db.schema.dropTable("pages"); },
    },
};
//# sourceMappingURL=migrations.js.map