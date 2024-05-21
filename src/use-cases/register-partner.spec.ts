import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPartnerRepository } from '@/repositories/in-memory/in-memory-partner.repository'

import { PartnerRepository } from './../repositories/partner.repository'
import { PartnerAlreadyExistError } from './errors/PartnerAlreadyExists.error'
import { RegisterPartner } from './register-partner'

let partnerRepository: PartnerRepository
let sut: RegisterPartner
describe('Register Partner', () => {
  beforeEach(() => {
    partnerRepository = new InMemoryPartnerRepository()
    sut = new RegisterPartner(partnerRepository) // System Under Test
  })
  it('should to register a partner', async () => {
    const { partner } = await sut.execute({
      document: '123456789',
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
        coordinates: [-46.57421, -21.785741],
      },
      ownerName: 'John Doe',
      tradingName: 'Doe Corporation',
    })

    expect(partner.id).toEqual(expect.any(String))
  })

  it('should not to be able register with same document', async () => {
    const document = '123456789'

    await sut.execute({
      document,
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
        coordinates: [-46.57421, -21.785741],
      },
      ownerName: 'John Doe',
      tradingName: 'Doe Corporation',
    })
    await expect(
      sut.execute({
        document,
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
          coordinates: [-46.57421, -21.785741],
        },
        ownerName: 'John Doe',
        tradingName: 'Doe Corporation',
      }),
    ).rejects.toBeInstanceOf(PartnerAlreadyExistError)
  })
})
