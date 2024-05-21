import { nanoid } from 'nanoid';
import { PartnerRepository } from '../repositories/partner.repository.js';
import { Partner } from '@prisma/client';
import { PartnerAlreadyExistError } from './errors/ParterAlreadyExists.error.js';

interface RegisterPartnerUseCaseRequest {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: {
    type: string;
    coordinates: number[][][][];
  };
  address: {
    type: string;
    coordinates: number[];
  };
}

interface RegisterPartnerUseCaseResponse {
  partner: Partner;
}

export class RegisterPartner {

  constructor(private partnerRepository: PartnerRepository) {}

  async execute(request: RegisterPartnerUseCaseRequest):  Promise<RegisterPartnerUseCaseResponse> {
    const partersExistWithDocument = await this.partnerRepository.findByDocument(request.document)

    if (partersExistWithDocument) {
      throw new PartnerAlreadyExistError()
    }

    const newPartner = {
      id: nanoid(),
      ...request
    }

    const partner = await this.partnerRepository.create(newPartner)
    return {
      partner
    }
  }
}
