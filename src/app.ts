import fastify from "fastify";
import { partnerRoutes } from "./controllers/partner/routes";

export const app = fastify()

app.register(partnerRoutes)