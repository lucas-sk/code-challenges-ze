import { nanoid } from 'nanoid'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Get By Id Partner (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to return a partner', async () => {
    const partner = await prisma.partner.create({
      data: {
        id: nanoid(),
        tradingName: 'Adega Osasco',
        ownerName: 'Joao Silva',
        document: '01.2134.567/00201-891',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-49.32291, -25.4398],
                [-49.29751, -25.43377],
                [-49.25585, -25.4169],
                [-49.25524, -25.40981],
                [-49.25761, -25.40403],
                [-49.25524, -25.39787],
                [-49.26005, -25.39178],
                [-49.26078, -25.3819],
                [-49.26267, -25.37348],
                [-49.25952, -25.37003],
                [-49.25971, -25.36597],
                [-49.26301, -25.35774],
                [-49.26468, -25.34742],
                [-49.30623, -25.35119],
                [-49.32291, -25.4398],
              ],
            ],
          ],
        },
        address: {
          type: 'Point',
          coordinates: [-49.283756, -25.401233],
        },
      },
    })

    const response = await request(app.server).get(`/partners/${partner.id}`)

    expect(response.statusCode).toBe(200)
  })
})
