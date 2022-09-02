import { JSONSchemaType } from 'ajv'

const NAME = 'name'
const ADDRESS = 'address'
const TYPE = 'type'

const baseSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    [NAME]: {
      type: 'string',
      minLength: 3,
    },
    [ADDRESS]: {
      type: 'string',
    },
    [TYPE]: {
      type: 'string',
    },
  },
}

export const createRestaurantDtoSchema = {
  ...baseSchema,
  required: [NAME, ADDRESS],
}

export const updateRestaurantDtoSchema = {
  ...baseSchema,
  anyOf: [{ required: [NAME] }, { required: [ADDRESS] }, { required: [TYPE] }],
} as JSONSchemaType<any>
