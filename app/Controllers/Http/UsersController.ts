import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class UsersController {
  public async store({ request, response }) {
    const payload = await request.validate(UserCreateValidator)
    const user: User = new User()

    user.username = payload.username
    user.email = payload.email
    user.avatar = payload.avatar ?? null
    user.password = payload.password

    await user.save()

    return response.created({ user })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator)

    try {
      return await auth.use('api').attempt(payload.email, payload.password)
    } catch (e) {
      return response.unauthorized({
        errors: [{ message: e.responseText }],
      })
    }
  }
}
