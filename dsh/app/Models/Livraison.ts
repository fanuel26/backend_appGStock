import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Livraison extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_gerant: number

  @column()
  public id_carnet: number

  @column()
  public id_collecteur: number

  @column()
  public nbr: number

  @column()
  public nom_carnet: string

  @column()
  public nom_client: string

  @column()
  public nom_collecteur: string

  @column()
  public numero_client: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
