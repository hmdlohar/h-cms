"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
var core_1 = require("@hcms/core");
var migrations_1 = require("./migrations");
var collection = {
    collectionID: "pages",
    methods: __assign({}, (0, core_1.createDefaultCURD)("pages")),
    migrations: migrations_1.migrations,
};
function register() {
    return {
        pages: collection,
    };
}
//# sourceMappingURL=index.js.map