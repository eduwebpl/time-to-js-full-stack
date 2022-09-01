import { Validator } from 'express-json-validator-middleware'

const validator = new Validator({ allErrors: true })

export function mapErrors(errors) {
  if (!errors) {
    return ''
  }
  return validator.ajv.errorsText(errors)
}

export const validationMiddleware = validator.validate
