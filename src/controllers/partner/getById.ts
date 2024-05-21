import { ResourceNotFoundError } from '@/use-cases/errors/ResourceNotFound.error';
import { makeGetPartnerByIdUseCase } from '@/use-cases/factories/make-get-partner-by-id-use-case copy';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export function getById(request: FastifyRequest, reply: FastifyReply) {
  const getByIdParamsSchema = z.object({
    partnerId: z.string().uuid(),
  })

  const { partnerId } = getByIdParamsSchema.parse(request.params)

  try {
    const getPartnerByIdUseCase = makeGetPartnerByIdUseCase()

    const partner = getPartnerByIdUseCase.execute({ partnerId })

    return reply.status(201).send({
      partner
    })
  } catch(err) {

    if (err instanceof ResourceNotFoundError){
      return reply.status(404).send({
        message: err.message
      })
    }

    throw err
  }

}