import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Caule from 'App/Models/Caule'
import CauleCreateValidator from 'App/Validators/CauleCreateValidator'

export default class CaulesController {
  public async index({ response }) {
    const caules = await Caule.all()

    return response.send(caules)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CauleCreateValidator)
    const caule: Caule = await Caule.create({ ...payload, user_id: auth.user?.id })

    return response.created({ caule })
  }
}
