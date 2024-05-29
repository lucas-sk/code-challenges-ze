import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPartnerRepository } from '@/repositories/in-memory/in-memory-partner.repository'

import { FetchNearbyPartnersUseCase } from './fetch-nearby-partners'

let partnerRepository: InMemoryPartnerRepository
let sut: FetchNearbyPartnersUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    partnerRepository = new InMemoryPartnerRepository()
    sut = new FetchNearbyPartnersUseCase(partnerRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await partnerRepository.create({
      id: '1',
      tradingName: 'Adega Osasco',
      ownerName: 'Joao Silva',
      document: '01.234.567/0001-89',
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
    })

    await partnerRepository.create({
      id: '2',
      tradingName: 'Adega Pinheiros',
      ownerName: 'Ze da Silva',
      document: '04.433.714/0001-44',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-43.36556, -22.99669],
              [-43.36539, -23.01928],
              [-43.26583, -23.01802],
              [-43.25724, -23.00649],
              [-43.23355, -23.00127],
              [-43.2381, -22.99716],
              [-43.23866, -22.99649],
              [-43.24063, -22.99756],
              [-43.24634, -22.99736],
              [-43.24677, -22.99606],
              [-43.24067, -22.99381],
              [-43.24886, -22.99121],
              [-43.25617, -22.99456],
              [-43.25625, -22.99203],
              [-43.25346, -22.99065],
              [-43.29599, -22.98283],
              [-43.3262, -22.96481],
              [-43.33427, -22.96402],
              [-43.33616, -22.96829],
              [-43.342, -22.98157],
              [-43.34817, -22.97967],
              [-43.35142, -22.98062],
              [-43.3573, -22.98084],
              [-43.36522, -22.98032],
              [-43.36696, -22.98422],
              [-43.36717, -22.98855],
              [-43.36636, -22.99351],
              [-43.36556, -22.99669],
            ],
          ],
        ],
      },
      address: {
        type: 'Point',
        coordinates: [-49.325, -25.3905],
      },
    })

    const { partners } = await sut.execute({
      userLatitude: -25.401233,
      userLongitude: -49.283756,
    })

    expect(partners).toHaveLength(1)
    expect(partners).toEqual([
      expect.objectContaining({ tradingName: 'Adega Osasco' }),
    ])
  })
})
