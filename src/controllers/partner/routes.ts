import { FastifyInstance } from "fastify";
import { registerPartner } from "./register";

export async function partnerRoutes(app: FastifyInstance){
  app.post('/partners', registerPartner)
}