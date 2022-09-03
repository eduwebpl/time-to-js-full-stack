declare module '@ioc:Adonis/Core/Request' {
  import { JSONSchemaType } from 'ajv'
  import { User } from '@prisma/client'

  interface RequestContract {
    validateAjv(schema: JSONSchemaType<any>): void
    user: User
  }
}
