import { Type } from "@sinclair/typebox";

// Forma en que fastify devuelve los errores
export const ErrorRespuesta = Type.Object({
  statusCode: Type.Integer(),
  code: Type.Optional(Type.String()),
  error: Type.String(),
  message: Type.String(),
});
