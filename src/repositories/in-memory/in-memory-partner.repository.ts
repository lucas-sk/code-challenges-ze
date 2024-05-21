import { Partner, Prisma } from '@prisma/client'

import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

import { FindManyNearbyParams, PartnerRepository } from '../partner.repository'

export class InMemoryPartnerRepository implements PartnerRepository {
  public items: Partner[] = []

  async findManyNearby(params: FindManyNearbyParams): Promise<Partner[]> {
    const partners = this.items.filter((item) => {
      if (!item.address) {
        return false
      }

      const coordinate = {
        latitude: Number(item.address.coordinates[0]),
        longitude: Number(item.address.coordinates[1]),
      } as { latitude: number; longitude: number }

      const distance = getDistanceBetweenCoordinates(
        {
          longitude: params.longitude,
          latitude: params.latitude,
        },
        {
          longitude: coordinate.longitude,
          latitude: coordinate.latitude,
        },
      )

      return distance < 10
    })

    return partners
  }

  async create(data: Prisma.PartnerCreateInput): Promise<Partner> {
    const partner = {
      ...data,
    } as Partner

    this.items.push(partner)

    return partner
  }

  async findByDocument(document: string): Promise<Partner | null> {
    const partner = this.items.find((partner) => partner.document === document)

    if (!partner) {
      return null
    }

    return partner
  }

  async findById(id: string): Promise<Partner | null> {
    const partner = this.items.find((partner) => partner.id === id)

    if (!partner) {
      return null
    }

    return partner
  }
}
