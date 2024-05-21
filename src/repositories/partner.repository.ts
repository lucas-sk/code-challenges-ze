import { Partner, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface PartnerRepository {
  create(data: Prisma.PartnerCreateInput): Promise<Partner>
  findByDocument(document: string): Promise<Partner | null>
  findById(id: string): Promise<Partner | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Partner[]>
}
