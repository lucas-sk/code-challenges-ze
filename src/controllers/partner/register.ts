import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PartnerAlreadyExistError } from '@/use-cases/errors/PartnerAlreadyExists.error'
import { makeRegisterPartnerUseCase } from '@/use-cases/factories/make-register-partner-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPartner = z.object({
    tradingName: z.string(),
    ownerName: z.string(),
    document: z.string(),
    coverageArea: z.object({
      type: z.string(),
      coordinates: z.array(z.array(z.array(z.array(z.number())))),
    }),
    address: z.object({
      type: z.string(),
      coordinates: z.array(z.number()),
    }),
  })

  const { tradingName, ownerName, document, coverageArea, address } =
    registerPartner.parse(request.body)

  try {
    const registerPartnerUseCase = makeRegisterPartnerUseCase()
    const partner = await registerPartnerUseCase.execute({
      tradingName,
      ownerName,
      document,
      coverageArea,
      address,
    })
    return reply.status(201).send(partner)
  } catch (err) {
    console.log('🚀 ~ register ~ err:', err)
    if (err instanceof PartnerAlreadyExistError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
