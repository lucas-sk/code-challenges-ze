import { PrismaPartnerRepository } from '@/repositories/prisma/prisma-partner.repository'

import { FetchNearbyPartnersUseCase } from '../fetch-nearby-partners'

export function MakeFetchNearbyPartnersUseCase() {
  const prismaPartnerRepository = new PrismaPartnerRepository()
  const fetchNearbyPartnersUseCase = new FetchNearbyPartnersUseCase(
    prismaPartnerRepository,
  )

  return fetchNearbyPartnersUseCase
}
