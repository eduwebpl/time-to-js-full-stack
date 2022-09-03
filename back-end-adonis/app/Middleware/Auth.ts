import { HttpException } from '@adonisjs/http-server/build/src/Exceptions/HttpException'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import authService from '@ioc:Services/AuthService'

export default class Auth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const { authorization = '' } = request.headers()
    const [, token] = authorization.split(' ')
    if (!token) {
      throw new HttpException('Not allowed', 403)
    }
    request.user = await authService.getUserViaToken(token) // user from db....
    await next()
  }
}
