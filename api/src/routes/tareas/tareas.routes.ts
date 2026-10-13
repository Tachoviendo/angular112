import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

import { tareasRepo } from "../../repositories/tareas-repository.ts";
import { ErrorRespuesta } from "../../schemas/errores.ts";
import {
  ActualizarTarea,
  CrearTarea,
  FinalizarTarea,
  IdTareaParams,
  Tarea,
} from "../../schemas/tareas.ts";

const tareasRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // Todas las rutas de tareas piden token
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get(
    "/",
    {
      schema: {
        summary: "Listar tareas",
        description: "Ordenadas de la más nueva a la más vieja.",
        tags: ["tareas"],
        security: [{ bearerAuth: [] }],
        response: { 200: Type.Array(Tarea), 401: ErrorRespuesta },
      },
    },
    async () => {
      return tareasRepo.obtenerTodas();
    },
  );

  fastify.get(
    "/:id_tarea",
    {
      schema: {
        summary: "Obtener una tarea",
        tags: ["tareas"],
        security: [{ bearerAuth: [] }],
        params: IdTareaParams,
        response: { 200: Tarea, 401: ErrorRespuesta, 404: ErrorRespuesta },
      },
    },
    async (request) => {
      return tareasRepo.obtenerPorId(request.params.id_tarea);
    },
  );

  fastify.post(
    "/",
    {
      schema: {
        summary: "Crear tarea",
        description: "El creador es el usuario del token.",
        tags: ["tareas"],
        security: [{ bearerAuth: [] }],
        body: CrearTarea,
        response: { 201: Tarea, 400: ErrorRespuesta, 401: ErrorRespuesta },
      },
    },
    async (request, reply) => {
      const tarea = await tareasRepo.crear(request.user.id_usuario, request.body);
      return reply.code(201).send(tarea);
    },
  );

  fastify.patch(
    "/:id_tarea",
    {
      schema: {
        summary: "Modificar tarea",
        description: "Se mandan solo los campos a cambiar.",
        tags: ["tareas"],
        security: [{ bearerAuth: [] }],
        params: IdTareaParams,
        body: ActualizarTarea,
        response: {
          200: Tarea,
          400: ErrorRespuesta,
          401: ErrorRespuesta,
          404: ErrorRespuesta,
        },
      },
    },
    async (request) => {
      return tareasRepo.actualizar(request.params.id_tarea, request.body);
    },
  );

  fastify.patch(
    "/:id_tarea/finalizar",
    {
      schema: {
        summary: "Finalizar tarea",
        description:
          "Marca la tarea como terminada. Mandar {} para usar la hora actual. Si ya estaba terminada no cambia.",
        tags: ["tareas"],
        security: [{ bearerAuth: [] }],
        params: IdTareaParams,
        body: FinalizarTarea,
        response: { 200: Tarea, 400: ErrorRespuesta, 401: ErrorRespuesta, 404: ErrorRespuesta },
      },
    },
    async (request) => {
      return tareasRepo.finalizar(request.params.id_tarea, request.body.fecha);
    },
  );

  fastify.delete(
    "/:id_tarea",
    {
      schema: {
        summary: "Borrar tarea",
        tags: ["tareas"],
        security: [{ bearerAuth: [] }],
        params: IdTareaParams,
        response: { 204: Type.Null(), 401: ErrorRespuesta, 404: ErrorRespuesta },
      },
    },
    async (request, reply) => {
      await tareasRepo.eliminar(request.params.id_tarea);
      return reply.code(204).send(null);
    },
  );
};

export default tareasRoutes;
