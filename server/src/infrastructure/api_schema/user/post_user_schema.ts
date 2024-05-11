/**
 * POST: /userで使用されるHTTPリクエストのスキーマ
 */
export const schemas = {
  'POST /user': {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false
  },
}
