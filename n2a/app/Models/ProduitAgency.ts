import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProduitAgency extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_carnet: number

  @column()
  public nom_carnet: string

  @column()
  public id_agence: number

  @column()
  public nom_agence: string

  @column()
  public stock: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
