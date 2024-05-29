// export async function getById(request: FastifyRequest, reply: FastifyReply) {
//   const getByIdParamsSchema = z.object({
//     partnerId: z.string(),
//   })
//   const { partnerId } = getByIdParamsSchema.parse(request.params)
//   try {
//     const getPartnerByIdUseCase = makeGetPartnerByIdUseCase()
//     const partner = await getPartnerByIdUseCase.execute({ partnerId })
//     return reply.status(200).send(partner)
//   } catch (err) {
//     if (err instanceof ResourceNotFoundError) {
//       return reply.status(404).send({
//         message: err.message,
//       })
//     }
//     throw err
//   }
// }
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/ResourceNotFound.error'
import { makeGetPartnerByIdUseCase } from '@/use-cases/factories/make-get-partner-by-id-use-case copy'

export async function getByIdPartner(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/partners/:partnerId',
    {
      schema: {
        params: z.object({
          partnerId: z.string(),
        }),
        response: {
          200: z.object({
            partner: z.object({
              id: z.string(),
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
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { partnerId } = request.params

      try {
        const getPartnerByIdUseCase = makeGetPartnerByIdUseCase()

        const { partner } = await getPartnerByIdUseCase.execute({ partnerId })

        return reply.status(200).send({
          partner: {
            id: partner.id,
            tradingName: partner.tradingName,
            document: partner.document,
            ownerName: partner.ownerName,
            address: partner.address as { type: string; coordinates: number[] },
            coverageArea: partner.coverageArea as {
              type: string
              coordinates: number[][][][]
            },
          },
        })
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          return reply.status(404).send({
            message: err.message,
          })
        }

        throw err
      }
    },
  )
}
