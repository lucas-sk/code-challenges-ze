import { z } from 'zod';
import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterPartnerUseCase } from '@/use-cases/factories/make-register-partner-use-case';
import { PartnerAlreadyExistError } from '@/use-cases/errors/PartnerAlreadyExists.error';

export async function registerPartner(request: FastifyRequest, reply: FastifyReply) {
  const registerPartner = z.object({
    tradingName: z.string(),
    ownerName: z.string(),
    document: z.string(),
    coverageArea: z.object({
      type: z.string(),
      coordinates: z.array(z.array(z.array(z.array(z.number()))))
    }),
    address: z.object({
      type: z.string(),
      coordinates: z.array(z.number())
    })
  })

  const { tradingName, ownerName, document, coverageArea, address } = registerPartner.parse(request.body)

  try {
    const registerPartnerUseCase = makeRegisterPartnerUseCase()
    registerPartnerUseCase.execute({
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    })
  } catch(err) {
    if (err instanceof PartnerAlreadyExistError){
      return reply.status(409).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(201).send()
}