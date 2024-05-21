import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getById } from "./getById";

export async function partnerRoutes(app: FastifyInstance){
  app.post('/partners', register)
  app.get('/partners/:partnerId', getById)
}