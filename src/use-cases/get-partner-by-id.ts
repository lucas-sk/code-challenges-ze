import { PartnerRepository } from "@/repositories/partner.repository"
import { Partner } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/ResourceNotFound.error"

interface GetPartnerByIdRequest {
  partnerId: string
}

interface GetPartnerByIdResponse {
  partner: Partner
}


export class GetPartnerById {
  constructor(private partnerRepository: PartnerRepository) {}

  async execute({ partnerId }: GetPartnerByIdRequest): Promise<GetPartnerByIdResponse> {
    const partner = await this.partnerRepository.findById(partnerId)

    if (!partner) {
      throw new ResourceNotFoundError()
    }

    return {
      partner
    }
  }
}