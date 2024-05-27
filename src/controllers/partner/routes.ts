import { FastifyInstance } from 'fastify'

import { getById } from './getById'
import { nearby } from './nearby'
import { register } from './register'

export async function partnerRoutes(app: FastifyInstance) {
  app.post('/partners', register)
  app.get('/partners/:partnerId', getById)
  app.get('/partners', nearby)
}
