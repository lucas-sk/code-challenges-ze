import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyPartnersUseCase } from '@/use-cases/factories/make-fetch-nearby-partners-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyPartnerQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyPartnerQuerySchema.parse(request.query)

  const fetchNearbyPartnersUseCase = makeFetchNearbyPartnersUseCase()

  const partners = await fetchNearbyPartnersUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send(partners)
}
