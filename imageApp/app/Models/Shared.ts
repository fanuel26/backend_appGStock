import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Shared extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_carnet: number

  @column()
  public nbr: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
