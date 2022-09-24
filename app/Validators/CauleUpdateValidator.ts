import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CauleUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(60)]),
    body: schema.string({ trim: false }, [rules.minLength(3), rules.maxLength(1000)]),
  })

  public messages: CustomMessages = {}
}
