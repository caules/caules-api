import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import UserUpdateValidator from 'App/Validators/UserUpdateValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreateValidator)
    const user: User = new User()

    user.username = payload.username
    user.email = payload.email
    user.avatar = payload.avatar ?? null
    user.password = payload.password

    try {
      await user.save()
    } catch (e) {
      return response.badRequest({
        errors: [{ message: e.responseText }],
      })
    }

    return response.created({ user })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(UserUpdateValidator)
    const authUser = await auth.use('api').authenticate()
    const user: User = await User.findByOrFail('id', authUser.id)

    payload.email ? (user.email = payload.email) : null
    payload.username ? (user.username = payload.username) : null
    payload.password ? (user.password = payload.password) : null
    payload.avatar ? (user.avatar = payload.avatar) : null

    try {
      await user.save()
    } catch (e) {
      return response.unprocessableEntity({
        errors: [{ message: e.responseText }],
      })
    }

    return response.ok({ user })
  }
}
