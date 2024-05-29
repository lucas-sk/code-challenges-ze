// export async function registerPartner(request: FastifyRequest, reply: FastifyReply) {
//   const registerPartner = z.object({
//     tradingName: z.string(),
//     ownerName: z.string(),
//     document: z.string(),
//     coverageArea: z.object({
//       type: z.string(),
//       coordinates: z.array(z.array(z.array(z.array(z.number())))),
//     }),
//     address: z.object({
//       type: z.string(),
//       coordinates: z.array(z.number()),
//     }),
//   })
//   const { tradingName, ownerName, document, coverageArea, address } =
//     registerPartner.parse(request.body)
//   try {
//     const registerPartnerUseCase = makeRegisterPartnerUseCase()
//     const partner = await registerPartnerUseCase.execute({
//       tradingName,
//       ownerName,
//       document,
//       coverageArea,
//       address,
//     })
//     return reply.status(201).send(partner)
//   } catch (err) {
//     if (err instanceof PartnerAlreadyExistError) {
//       return reply.status(409).send({
//         message: err.message,
//       })
//     }
//     throw err
//   }
// }
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PartnerAlreadyExistError } from '@/use-cases/errors/PartnerAlreadyExists.error'
import { makeRegisterPartnerUseCase } from '@/use-cases/factories/make-register-partner-use-case'

export async function registerPartner(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/partners',
    {
      schema: {
        tags: ['partners'],
        summary: 'Register a new partner',
        body: z.object({
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
        response: {
          201: z.object({
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
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tradingName, ownerName, document, coverageArea, address } =
        request.body
      try {
        const registerPartnerUseCase = makeRegisterPartnerUseCase()
        const { partner } = await registerPartnerUseCase.execute({
          tradingName,
          ownerName,
          document,
          coverageArea,
          address,
        })

        return reply.status(201).send({
          partner: {
            id: partner.id,
            address: partner.address as { type: string; coordinates: number[] },
            coverageArea: partner.coverageArea as {
              type: string
              coordinates: number[][][][]
            },
            document: partner.document,
            ownerName: partner.ownerName,
            tradingName: partner.tradingName,
          },
        })
      } catch (err) {
        if (err instanceof PartnerAlreadyExistError) {
          return reply.status(409).send({
            message: err.message,
          })
        }
        throw err
      }
    },
  )
}
