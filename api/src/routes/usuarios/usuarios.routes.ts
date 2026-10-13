import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

import { NotFoundError } from "../../errors/response.errors.ts";
import { usuariosRepo } from "../../repositories/usuarios-repository.ts";
import { ErrorRespuesta } from "../../schemas/errores.ts";
import {
  ActualizarUsuario,
  CrearUsuario,
  IdUsuarioParams,
  Usuario,
} from "../../schemas/usuarios.ts";

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // Todas las rutas de usuarios piden token
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get(
    "/",
    {
      schema: {
        summary: "Listar usuarios",
        tags: ["usuarios"],
        security: [{ bearerAuth: [] }],
        response: { 200: Type.Array(Usuario), 401: ErrorRespuesta },
      },
    },
    async () => {
      return usuariosRepo.obtenerTodos();
    },
  );

  fastify.get(
    "/:id_usuario",
    {
      schema: {
        summary: "Obtener un usuario",
        tags: ["usuarios"],
        security: [{ bearerAuth: [] }],
        params: IdUsuarioParams,
        response: { 200: Usuario, 401: ErrorRespuesta, 404: ErrorRespuesta },
      },
    },
    async (request) => {
      return usuariosRepo.obtenerPorId(request.params.id_usuario);
    },
  );

  fastify.post(
    "/",
    {
      schema: {
        summary: "Crear usuario",
        description: "Solo admin o superadmin.",
        tags: ["usuarios"],
        security: [{ bearerAuth: [] }],
        body: CrearUsuario,
        response: {
          201: Usuario,
          400: ErrorRespuesta,
          401: ErrorRespuesta,
          403: ErrorRespuesta,
          409: ErrorRespuesta,
        },
      },
      preHandler: fastify.verificarAdmin,
    },
    async (request, reply) => {
      const usuario = await usuariosRepo.crear(request.body);
      return reply.code(201).send(usuario);
    },
  );

  fastify.patch(
    "/:id_usuario",
    {
      schema: {
        summary: "Modificar usuario",
        description: "Solo admin o superadmin. Se mandan solo los campos a cambiar.",
        tags: ["usuarios"],
        security: [{ bearerAuth: [] }],
        params: IdUsuarioParams,
        body: ActualizarUsuario,
        response: {
          200: Usuario,
          400: ErrorRespuesta,
          401: ErrorRespuesta,
          403: ErrorRespuesta,
          404: ErrorRespuesta,
        },
      },
      preHandler: fastify.verificarAdmin,
    },
    async (request) => {
      return usuariosRepo.actualizar(request.params.id_usuario, request.body);
    },
  );

  fastify.delete(
    "/:id_usuario",
    {
      schema: {
        summary: "Borrar usuario",
        description: "Solo admin o superadmin. También borra las tareas que creó.",
        tags: ["usuarios"],
        security: [{ bearerAuth: [] }],
        params: IdUsuarioParams,
        response: {
          204: Type.Null(),
          401: ErrorRespuesta,
          403: ErrorRespuesta,
          404: ErrorRespuesta,
        },
      },
      preHandler: fastify.verificarAdmin,
    },
    async (request, reply) => {
      const borrado = await usuariosRepo.eliminar(request.params.id_usuario);
      if (!borrado) throw new NotFoundError("Usuario no encontrado.");
      return reply.code(204).send(null);
    },
  );
};

export default usuariosRoutes;
