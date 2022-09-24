import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Caule from 'App/Models/Caule'
import CauleCreateValidator from 'App/Validators/CauleCreateValidator'
import CauleUpdateValidator from 'App/Validators/CauleUpdateValidator'

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
    const payload = await request.validate(CauleUpdateValidator)
    const caule = await Caule.findOrFail(params.id)

    if (!this.isUserCauleOwner(caule.id, auth.user?.id)) {
      return response.unauthorized({
        errors: [{ message: 'Unauthorized' }],
      })
    }

    caule.title = payload.title
    caule.body = payload.body

    try {
      await caule.save()
    } catch (e) {
      return response.unprocessableEntity({
        errors: [{ message: e.responseText }],
      })
    }

    return response.ok({ caule })
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    const caule = await Caule.findOrFail(params.id)

    if (!this.isUserCauleOwner(caule.id, auth.user?.id)) {
      return response.unauthorized({
        errors: [{ message: 'Unauthorized' }],
      })
    }

    try {
      await caule.delete()
    } catch (e) {
      return response.unprocessableEntity({
        errors: [{ message: e.responseText }],
      })
    }

    return response.accepted({ caule })
  }

  public isUserCauleOwner(cauleId: number, userId?: number): boolean {
    if (userId && cauleId) {
      return userId === cauleId
    }
    return false
  }
}
