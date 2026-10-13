import fastifyPlugin from "fastify-plugin";

import { transformarErrorPostgres } from "../errors/response.errors.ts";
import type { PostgresError } from "../errors/response.errors.ts";

// Los errores de postgres traen un code de 5 caracteres (SQLSTATE), ej: 23505
function esErrorPostgres(error: unknown): error is PostgresError {
  return (
    error instanceof Error &&
    typeof (error as PostgresError).code === "string" &&
    /^[0-9A-Z]{5}$/.test((error as PostgresError).code!)
  );
}

export default fastifyPlugin(async function erroresPlugin(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    if (esErrorPostgres(error)) {
      request.log.error(error);
      const transformado = transformarErrorPostgres(error);
      return reply.status(transformado.statusCode ?? 500).send(transformado);
    }
    // Validación, 404, 401, etc. los resuelve fastify como siempre
    return reply.send(error);
  });
});
