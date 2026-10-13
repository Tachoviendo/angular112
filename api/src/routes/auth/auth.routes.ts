import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

import { UnAuthenticatedError } from "../../errors/response.errors.ts";
import { usuariosRepo } from "../../repositories/usuarios-repository.ts";
import { Login, LoginRespuesta } from "../../schemas/auth.ts";
import { ErrorRespuesta } from "../../schemas/errores.ts";
import { Usuario } from "../../schemas/usuarios.ts";

const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    "/login",
    {
      schema: {
        summary: "Login",
        description: "Devuelve un token JWT si el usuario y la contraseña son correctos.",
        tags: ["auth"],
        body: Login,
        response: { 200: LoginRespuesta, 401: ErrorRespuesta },
      },
    },
    async (request) => {
      const { username, password } = request.body;

      let usuario;
      try {
        usuario = await usuariosRepo.verificarCredenciales(username, password);
      } catch {
        throw new UnAuthenticatedError("Usuario o contraseña incorrectos.");
      }

      const token = fastify.jwt.sign({
        id_usuario: usuario.id_usuario,
        username: usuario.username,
        grupos: usuario.grupos,
      });

      return { token, usuario };
    },
  );

  fastify.get(
    "/me",
    {
      schema: {
        summary: "Usuario autenticado",
        description: "Devuelve los datos del usuario dueño del token.",
        tags: ["auth"],
        security: [{ bearerAuth: [] }],
        response: { 200: Usuario, 401: ErrorRespuesta },
      },
      onRequest: fastify.authenticate,
    },
    async (request) => {
      return usuariosRepo.obtenerPorId(request.user.id_usuario);
    },
  );
};

export default authRoutes;
