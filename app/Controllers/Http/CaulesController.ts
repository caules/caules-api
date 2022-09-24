import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Caule from 'App/Models/Caule'
import CauleCreateValidator from 'App/Validators/CauleCreateValidator'
import CauleEditValidator from 'App/Validators/CauleEditValidator'

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

  public async update({ request, response, params, auth }: HttpContextContract) {
    const payload = await request.validate(CauleEditValidator)
    const caule = await Caule.findOrFail(params.id)

    if (!this.isUserCauleOwner(caule.id, auth.user?.id)) {
      return response.unauthorized({
        errors: [{ message: 'Unauthorized' }],
      })
    }

    caule.title = payload.title
    caule.body = payload.body

    caule.save()

    return response.created({ caule })
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    const caule = await Caule.findOrFail(params.id)

    if (!this.isUserCauleOwner(caule.id, auth.user?.id)) {
      return response.unauthorized({
        errors: [{ message: 'Unauthorized' }],
      })
    }

    caule.delete()

    return response.accepted({ caule })
  }

  public isUserCauleOwner(cauleId: number, userId?: number) {
    if (userId && cauleId) {
      return userId === cauleId
    }
    return false
  }
}
