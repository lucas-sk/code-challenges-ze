import { Prisma, Partner } from "@prisma/client";

export interface PartnerRepository {
  create(data: Prisma.PartnerCreateInput): Promise<Partner> ;
  findByDocument(document: string): Promise<Partner | null>;
  findById(id: string): Promise<Partner | null>;
}