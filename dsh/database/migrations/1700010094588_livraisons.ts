import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'livraisons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_gerant', 11).notNullable()
      table.integer('id_carnet', 11).notNullable()
      table.integer('id_collecteur', 11).notNullable()
      table.integer('nbr', 11).notNullable()
      table.string('nom_carnet', 255).notNullable()
      table.string('nom_client', 255).notNullable()
      table.string('nom_collecteur', 255).notNullable()
      table.string('numero_client', 255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
