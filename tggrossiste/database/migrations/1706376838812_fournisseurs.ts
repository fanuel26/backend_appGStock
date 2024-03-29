import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fournisseurs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom', 255).notNullable()
      table.integer('num_first', 11).notNullable()
      table.integer('num_second', 11)
      table.string('lieu', 255).notNullable()
      table.integer('prix', 11).notNullable()
      table.integer('id_produit', 11).notNullable()
      table.string('etat', 1).notNullable().defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
