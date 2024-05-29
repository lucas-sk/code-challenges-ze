import { FastifyInstance } from 'fastify'

import { nearby } from './nearby'

export async function partnerRoutes(app: FastifyInstance) {
  app.get(
    '/partners',
    // {
    //   schema: {
    //     body: z.object({
    //       latitude: z.coerce.number().refine((value) => {
    //         return Math.abs(value) <= 90
    //       }),
    //       longitude: z.coerce.number().refine((value) => {
    //         return Math.abs(value) <= 180
    //       }),
    //     }),
    //     response: {
    //       200: z.array(
    //         z.object({
    //           id: z.string(),
    //           tradingName: z.string(),
    //           ownerName: z.string(),
    //           document: z.string(),
    //           coverageArea: z.object({
    //             type: z.string(),
    //             coordinates: z.array(z.array(z.array(z.array(z.number())))),
    //           }),
    //           address: z.object({
    //             type: z.string(),
    //             coordinates: z.array(z.number()),
    //           }),
    //         }),
    //       ),
    //     },
    //   },
    // },
    nearby,
  )
}
