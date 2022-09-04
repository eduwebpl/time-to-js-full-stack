import { HttpException } from '@adonisjs/http-server/build/src/Exceptions/HttpException'
import prisma from '@ioc:Orm/Prisma'
import Env from '@ioc:Adonis/Core/Env'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { KeyLike, SignJWT, jwtVerify } from 'jose'

export class AuthService {
  constructor(private signKey: KeyLike) {}

  public async getUserViaToken(token: string): Promise<User> {
    const { payload } = await jwtVerify(token, this.signKey)
    const { id } = payload
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) {
      throw new HttpException('Not allowed', 403)
    }
    return user
  }

  public async signIn(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      throw new HttpException('Not authorized', 401)
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new HttpException('Not authorized', 401)
    }
    return new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'ES256' })
      .setIssuedAt()
      .setExpirationTime(Env.get('NODE_ENV') === 'development' ? '2d' : '1h')
      .sign(this.signKey)
  }
}
