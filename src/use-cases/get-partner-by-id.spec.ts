import { InMemoryPartnerRepository } from "@/repositories/in-memory/in-memory-partner.repository"
import { beforeEach, describe, expect, it } from "vitest"
import { PartnerRepository } from "@/repositories/partner.repository"
import { GetPartnerById } from "./get-partner-by-id"
import { ResourceNotFoundError } from "./errors/ResourceNotFound.error"
let partnerRepository: PartnerRepository
let sut: GetPartnerById
describe('Register Partner', () => {
  beforeEach(() => {
    partnerRepository = new InMemoryPartnerRepository()
    sut = new GetPartnerById(partnerRepository) // System Under Test
  })

  it('should be able return a partner', async () => {
    await partnerRepository.create({
      id: '1',
      document: '123456789',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [30, 20],
              [45, 40],
              [10, 40],
              [30, 20]
            ]
          ]
        ]
      },
      address: {
        type: 'Point',
        coordinates: [-46.57421, -21.785741]
      },
      ownerName: 'John Doe',
      tradingName: 'Doe Corporation'
    })

    const { partner } = await sut.execute({
      partnerId: '1'
    })

    expect(partner.id).toEqual(expect.any(String))
  })

  it("should not be able to get partner with wrong id", async () => {
    await expect(sut.execute({ partnerId: 'not-existing-id' })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

