import { Partner, Prisma } from '@prisma/client'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { multiPolygon, point } from '@turf/helpers'

import { FindManyNearbyParams, PartnerRepository } from '../partner.repository'

export class InMemoryPartnerRepository implements PartnerRepository {
  public items: Partner[] = []

  async findManyNearby(params: FindManyNearbyParams): Promise<Partner[]> {
    const partners = this.items.filter((item) => {
      if (!item.coverageArea) {
        return false
      }

      const pointToCheck = point([params.longitude, params.latitude])
      const coordinates: number[][][][] = item.coverageArea.coordinates

      const turfMultiPolygon = multiPolygon(coordinates)

      const isWithinCoverage = booleanPointInPolygon(
        pointToCheck,
        turfMultiPolygon,
      )

      return isWithinCoverage
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
