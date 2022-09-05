import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    restaurantId: schema.number(),
    productsIds: schema.array().members(schema.number()),
    address: schema.string()
  })

  public messages: CustomMessages = {}
}
