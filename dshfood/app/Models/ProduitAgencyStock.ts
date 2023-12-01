import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProduitAgencyStock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_produit_agency: number

  @column()
  public nbr: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
