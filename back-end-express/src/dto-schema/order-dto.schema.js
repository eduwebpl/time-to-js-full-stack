export const createOrderDtoSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['restaurantId', 'productsIds', 'address'],
  properties: {
    address: {
      type: 'string',
    },
    restaurantId: {
      type: 'integer',
    },
    productsIds: {
      type: 'array',
      items: {
        type: 'integer',
      },
      minItems: 1,
    },
  },
}
