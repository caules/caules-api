import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string({ trim: true }, [
      rules.alpha(),
      rules.minLength(4),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    avatar: schema.string.optional(),
    password: schema.string({ trim: true }, [rules.confirmed(), rules.minLength(6)]),
    password_confirmation: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
