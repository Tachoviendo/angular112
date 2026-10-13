import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import swaggerPlugin from "./plugins/swagger.ts";
import jwtPlugin from "./plugins/jwt.ts";
import erroresPlugin from "./plugins/errores.ts";
import authRoutes from "./routes/auth/auth.routes.ts";

const fastify = Fastify({
  logger: true,
  ajv: { customOptions: { coerceTypes: true, removeAdditional: true } },
}).withTypeProvider<TypeBoxTypeProvider>();

await fastify.register(swaggerPlugin);
await fastify.register(jwtPlugin);
await fastify.register(erroresPlugin);

await fastify.register(authRoutes, { prefix: "/auth" });

try {
  await fastify.listen({ host: "0.0.0.0", port: Number(process.env.PORT ?? 3000) });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
