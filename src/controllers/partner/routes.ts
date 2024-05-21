import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function partnerRoutes(app: FastifyInstance){
  app.post('/partners', register)
}