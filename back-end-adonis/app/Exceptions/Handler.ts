/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { NotFoundError } from '@prisma/client/runtime'
import { errors } from 'jose'

const { JWTExpired, JWSSignatureVerificationFailed, JWSInvalid } = errors

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error instanceof JWTExpired) {
      return ctx.response.status(401).json({ message: 'Token has expired' })
    }
    if (error instanceof JWSSignatureVerificationFailed || error instanceof JWSInvalid) {
      return ctx.response.status(403).json({ message: 'Verification failed' })
    }
    if (error instanceof NotFoundError) {
      return ctx.response.status(404).json({ message: error.message })
    }
    return super.handle(error, ctx)
  }
}
