import fastify from 'fastify'
import { ZodError } from 'zod'

import { partnerRoutes } from './controllers/partner/routes'

export const app = fastify()

app.register(partnerRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})

// {"type":"MultiPolygon","coordinates":[[[[-49.32291,-25.4398],[-49.29751,-25.43377],[-49.25585,-25.4169],[-49.25524,-25.40981],[-49.25761,-25.40403],[-49.25524,-25.39787],[-49.26005,-25.39178],[-49.26078,-25.3819],[-49.26267,-25.37348],[-49.25952,-25.37003],[-49.25971,-25.36597],[-49.26301,-25.35774],[-49.26468,-25.34742],[-49.30623,-25.35119],[-49.32291,-25.4398]]]]}
// {"type":"Point","coordinates":[-49.283756,-25.401233]}
