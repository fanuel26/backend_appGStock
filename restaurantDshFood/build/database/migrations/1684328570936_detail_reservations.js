"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'detail_reservations';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('id_vente').notNullable().unsigned().references('id').inTable('ventes').onDelete('CASCADE');
            table.integer('id_user').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('id_produit').notNullable().unsigned().references('id').inTable('produits').onDelete('CASCADE');
            table.integer('qte', 11).notNullable();
            table.integer('prix_total', 11).notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1684328570936_detail_reservations.js.map