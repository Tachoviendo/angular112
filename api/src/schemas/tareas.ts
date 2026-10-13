import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

import { Grupo } from "./usuarios.ts";

// Igual que la tabla tareas de db/00.sql
export const Prioridad = Type.Union([
  Type.Literal("0:baja"),
  Type.Literal("1:media"),
  Type.Literal("2:alta"),
]);

export const Tarea = Type.Object({
  id_tarea: Type.Integer(),
  id_creador: Type.Integer(),
  grupo: Grupo,
  titulo: Type.String({ maxLength: 100 }),
  descripcion: Type.Union([Type.String(), Type.Null()]),
  prioridad: Prioridad,
  creada: Type.String({ format: "date-time" }),
  terminada: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  estado: Type.Union([Type.Literal("Abierta"), Type.Literal("Cerrada")]),
});
export type Tarea = Static<typeof Tarea>;

export const CrearTarea = Type.Object({
  grupo: Grupo,
  titulo: Type.String({ minLength: 1, maxLength: 100 }),
  descripcion: Type.Optional(Type.String()),
  prioridad: Type.Optional(Prioridad),
});
export type CrearTareaType = Static<typeof CrearTarea>;

export const ActualizarTarea = Type.Partial(
  Type.Object({
    grupo: Grupo,
    titulo: Type.String({ minLength: 1, maxLength: 100 }),
    descripcion: Type.String(),
    prioridad: Prioridad,
  }),
  { minProperties: 1 },
);
export type ActualizarTareaType = Static<typeof ActualizarTarea>;

export const IdTareaParams = Type.Object({
  id_tarea: Type.Integer({ minimum: 1 }),
});
export type IdTareaParamsType = Static<typeof IdTareaParams>;
