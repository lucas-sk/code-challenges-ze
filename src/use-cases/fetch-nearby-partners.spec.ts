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
      tradingName: 'Near adega',
      ownerName: 'John Doe',
      document: '1234567891234',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [30, 20],
              [45, 40],
              [10, 40],
              [30, 20],
            ],
          ],
        ],
      },
      address: {
        type: 'Point',
        coordinates: [-27.2092052, -49.6401091],
      },
    })

    await partnerRepository.create({
      id: '2',
      ownerName: 'John Doe 2',
      tradingName: 'Far adega',
      document: '1234567891233',
      address: {
        type: 'Point',
        coordinates: [-27.0610928, -49.5229501],
      },
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [30, 20],
              [45, 40],
              [10, 40],
              [30, 20],
            ],
          ],
        ],
      },
    })

    const { partners } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(partners).toHaveLength(1)
    expect(partners).toEqual([
      expect.objectContaining({ tradingName: 'Near adega' }),
    ])
  })
})
