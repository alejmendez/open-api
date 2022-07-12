import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([
      rules.unique({ table: 'users', column: 'username' }),
      rules.maxLength(100),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(100),
    ]),
    password: schema.string([rules.minLength(4)]),
    avatarUrl: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
