import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Model from './BaseModel'

export default class User extends Model {
  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatar: string | null

  @beforeSave()
  public static async hashPassword(user: User) {
    user.username = user.username.toLowerCase()
    user.email = user.email.toLowerCase()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
