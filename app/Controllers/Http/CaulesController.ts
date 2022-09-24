import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Caule from 'App/Models/Caule'
import CauleCreateValidator from 'App/Validators/CauleCreateValidator'

export default class CaulesController {
  public async index({ response }) {
    const caules = await Caule.query().preload('user')

    return response.send(caules)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CauleCreateValidator)
    const caule: Caule = await Caule.create({ ...payload, userId: auth.user?.id })

    return response.created({ caule })
  }
}
