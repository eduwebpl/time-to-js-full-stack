import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import authService from '@ioc:Services/AuthService'

export default class UsersController {
  public async signIn({ request }: HttpContextContract) {
    const { email, password } = request.body()
    const token = await authService.signIn(email, password)
    return { token }
  }
}
