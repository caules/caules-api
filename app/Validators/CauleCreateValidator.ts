import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CauleCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    body: schema.string({ trim: true }, [rules.minLength(3)]),
  })

  public messages: CustomMessages = {}
}
