/**
 * GET: /userで使用されるHTTPリクエストのスキーマ
 */
export const schemas = {
  'GET /user': {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false
  },
}
