import { Partner, Prisma } from "@prisma/client";
import { PartnerRepository } from "../partner.repository";

export class InMemoryPartnerRepository implements PartnerRepository {
  public items: Partner[] = [];

  async create(data: Prisma.PartnerCreateInput): Promise<Partner> {
    const partner = {
      ...data,
    } as Partner

    this.items.push(partner)

    return partner
  }

  async findByDocument(document: string): Promise<Partner | null> {
    return this.items.find(partner => partner.document === document) || null
  }
}