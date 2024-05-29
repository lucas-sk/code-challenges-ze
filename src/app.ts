import fastifySwagger from '@fastify/swagger'
import scalar from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import { registerPartner } from './http/controllers/partner/register'
import { partnerRoutes } from './http/controllers/partner/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Partner API',
      description: 'API to manage partners for ze delevery challenger',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(scalar, {
  routePrefix: '/docs',
})

app.register(partnerRoutes)
app.register(registerPartner)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  return reply.status(500).send({
    message: 'Internal server error!!.',
  })
})
