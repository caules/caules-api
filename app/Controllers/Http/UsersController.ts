import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreateValidator)
    const user: User = new User()

    user.username = payload.username
    user.email = payload.email
    user.avatar = payload.avatar ?? null
    user.password = payload.password

    await user.save()

    return response.created({ user })
  }
}
