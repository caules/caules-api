import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.nullableAndOptional({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string.nullableAndOptional({ trim: true }, [
      rules.alphaNum(),
      rules.minLength(4),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    avatar: schema.string.optional(),
    password: schema.string.nullableAndOptional({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(255),
      rules.confirmed(),
    ]),
    password_confirmation: schema.string.nullableAndOptional(),
  })

  public messages: CustomMessages = {}
}
