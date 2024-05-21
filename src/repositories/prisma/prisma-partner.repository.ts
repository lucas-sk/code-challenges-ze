import { Partner, Prisma } from "@prisma/client";
import { PartnerRepository } from "../partner.repository";
import { prisma } from "@/lib/prisma";

export class PrismaPartnerRepository implements PartnerRepository {
  async create(data: Prisma.PartnerCreateInput): Promise<Partner> {
    const partner = await prisma.partner.create({
      data
    })
    return partner
  }

  findByDocument(document: string): Promise<Partner | null> {
    const partner = prisma.partner.findUnique({
      where: {
        document
      }
    })

    return partner
  }

}