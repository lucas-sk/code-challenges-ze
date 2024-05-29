import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeFetchNearbyPartnersUseCase } from '@/use-cases/factories/make-fetch-nearby-partners-use-case'

export async function nearByPartners(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/partners',
    {
      schema: {
        querystring: z.object({
          latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
          }),
          longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
          }),
        }),
        response: {
          200: z.object({
            partners: z.array(
              z.object({
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
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const nearbyPartnerQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
      })
      const { latitude, longitude } = nearbyPartnerQuerySchema.parse(
        request.query,
      )
      const fetchNearbyPartnersUseCase = makeFetchNearbyPartnersUseCase()
      const { partners } = await fetchNearbyPartnersUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude,
      })

      return reply.status(200).send({
        partners: partners.map((partner) => ({
          id: partner.id,
          tradingName: partner.tradingName,
          ownerName: partner.ownerName,
          document: partner.document,
          coverageArea: partner.coverageArea as {
            type: string
            coordinates: number[][][][]
          },
          address: partner.address as { type: string; coordinates: number[] },
        })),
      })
    },
  )
}
