import { PartnerRepository } from "@/repositories/partner.repository"
import { Partner } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/ResourceNotFound.error"

interface GetPartnerByIdRequest {
  id: string
}

interface GetPartnerByIdResponse {
  partner: Partner
}


export class GetPartnerById {
  constructor(private partnerRepository: PartnerRepository) {}

  async execute({ id }: GetPartnerByIdRequest): Promise<GetPartnerByIdResponse> {
    const partner = await this.partnerRepository.findById(id)

    if (!partner) {
      throw new ResourceNotFoundError()
    }

    return {
      partner
    }
  }
}