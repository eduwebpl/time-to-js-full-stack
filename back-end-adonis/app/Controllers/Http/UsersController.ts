import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async signIn({}: HttpContextContract) {
    return { user: 'works' }
  }
}
