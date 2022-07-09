// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HealthController {
  public async index() {
    return {
      version: '0.0.1',
    }
  }
}
