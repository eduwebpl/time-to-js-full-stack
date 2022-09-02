declare module '@ioc:Adonis/Core/Request' {
  import { JSONSchemaType } from 'ajv'

  interface RequestContract {
    validateAjv(schema: JSONSchemaType<any>): void
  }
}
