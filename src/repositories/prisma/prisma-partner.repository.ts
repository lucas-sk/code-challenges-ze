import { Partner, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyNearbyParams, PartnerRepository } from '../partner.repository'

export class PrismaPartnerRepository implements PartnerRepository {
  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Partner[]> {
    const parameter = JSON.stringify({
      type: 'Point',
      coordinates: [longitude, latitude],
    })
    const partners = await prisma.$queryRaw<Partner[]>`
      SELECT id as "id", trading_name AS "tradingName",
  owner_name AS "ownerName",
  document AS "document",
  coverage_area AS "coverageArea",
  address AS "address" FROM partners WHERE ST_Contains(ST_GeomFromGeoJSON(partners.coverage_area), ST_GeomFromGeoJSON(${parameter})) ORDER BY ST_Distance(ST_GeomFromGeoJSON(partners.coverage_area), ST_GeomFromGeoJSON(${parameter}));
    `
    return partners
  }

  async create(data: Prisma.PartnerCreateInput): Promise<Partner> {
    const partner = await prisma.partner.create({
      data,
    })
    return partner
  }

  async findById(id: string): Promise<Partner | null> {
    const partner = prisma.partner.findUnique({
      where: {
        id,
      },
    })

    return partner
  }

  findByDocument(document: string): Promise<Partner | null> {
    const partner = prisma.partner.findUnique({
      where: {
        document,
      },
    })

    return partner
  }
}
