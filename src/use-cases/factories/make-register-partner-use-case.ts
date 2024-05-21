import { PrismaPartnerRepository } from "@/repositories/prisma/prisma-partner.repository";
import { RegisterPartner } from "../register-partner";

export function makeRegisterPartnerUseCase() {
  const prismaPartnerRepository = new PrismaPartnerRepository()
  const registerPartnerUseCase = new RegisterPartner(prismaPartnerRepository)

  return registerPartnerUseCase
}