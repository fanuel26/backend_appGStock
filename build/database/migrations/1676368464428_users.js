"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id').primary();
            table.string('nom', 255).notNullable();
            table.string('email', 255).notNullable().unique();
            table.string('password', 180).notNullable();
            table.string('password_review', 180).notNullable();
            table.integer('role', 1).notNullable().defaultTo(0);
            table.integer('id_agence', 11).nullable();
            table.string('nom_agence', 255).nullable();
            table.string('remember_me_token').nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1676368464428_users.js.map