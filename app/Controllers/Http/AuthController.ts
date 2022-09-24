import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator)

    try {
      return await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '1 year',
      })
    } catch (e) {
      return response.unauthorized({
        errors: [{ message: e.responseText }],
      })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      return await auth.use('api').revoke()
    } catch (e) {
      return response.unauthorized({
        errors: [{ message: e.responseText }],
      })
    }
  }
}
