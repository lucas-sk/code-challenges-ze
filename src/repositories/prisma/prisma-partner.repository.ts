import { Partner, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { PartnerRepository } from '../partner.repository'

export class PrismaPartnerRepository implements PartnerRepository {
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
