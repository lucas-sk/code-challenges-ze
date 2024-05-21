import { Prisma, Partner } from "@prisma/client";

export interface PartnerRepository {
  create(partner: Prisma.PartnerCreateInput): Promise<Partner> ;
  findByDocument(document: string): Promise<Partner | null>;
}