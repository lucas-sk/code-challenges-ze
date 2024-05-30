import { PrismaPartnerRepository } from '@/repositories/prisma/prisma-partner.repository'

import { GetPartnerById } from './../get-partner-by-id'

export function makeGetPartnerByIdUseCase() {
  const prismaPartnerRepository = new PrismaPartnerRepository()
  const getPartnerByIdUseCase = new GetPartnerById(prismaPartnerRepository)

  return getPartnerByIdUseCase
}
