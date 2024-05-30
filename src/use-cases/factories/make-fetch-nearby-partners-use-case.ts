import { PrismaPartnerRepository } from '@/repositories/prisma/prisma-partner.repository'

import { FetchNearbyPartnersUseCase } from '../fetch-nearby-partners'

export function makeFetchNearbyPartnersUseCase() {
  const prismaPartnerRepository = new PrismaPartnerRepository()
  const fetchNearbyPartnersUseCase = new FetchNearbyPartnersUseCase(
    prismaPartnerRepository,
  )

  return fetchNearbyPartnersUseCase
}
