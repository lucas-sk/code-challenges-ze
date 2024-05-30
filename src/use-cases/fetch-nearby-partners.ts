import { Partner } from '@prisma/client'

import { PartnerRepository } from '@/repositories/partner.repository'

interface FetchNearbyPartnersRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyPartnersResponse {
  partners: Partner[]
}

export class FetchNearbyPartnersUseCase {
  constructor(private partnerRepository: PartnerRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyPartnersRequest): Promise<FetchNearbyPartnersResponse> {
    const partners = await this.partnerRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      partners,
    }
  }
}
