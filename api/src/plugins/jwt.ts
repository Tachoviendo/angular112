import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";

import { UnAuthenticatedError } from "../errors/response.errors.ts";

export default fastifyPlugin(async function jwtPlugin(fastify) {
  const secret = process.env.FASTIFY_SECRET;
  if (!secret) throw new Error("Falta FASTIFY_SECRET en el .env");

  await fastify.register(fastifyJwt, { secret, sign: { expiresIn: "8h" } });

  fastify.decorate("authenticate", async function (request: FastifyRequest) {
    try {
      await request.jwtVerify();
    } catch {
      throw new UnAuthenticatedError("Token inválido o vencido.");
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

// Lo que va adentro del token
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id_usuario: number; username: string; grupos: string[] };
    user: { id_usuario: number; username: string; grupos: string[] };
  }
}
