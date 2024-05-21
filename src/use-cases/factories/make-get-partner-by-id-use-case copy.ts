import { GetPartnerById } from './../get-partner-by-id';
import { PrismaPartnerRepository } from "@/repositories/prisma/prisma-partner.repository";

export function makeGetPartnerByIdUseCase() {
  const prismaPartnerRepository = new PrismaPartnerRepository()
  const getPartnerByIdUseCase = new GetPartnerById(prismaPartnerRepository)

  return getPartnerByIdUseCase
}