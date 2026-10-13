import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox";

// Igual que la tabla usuarios de db/00.sql
// Unsafe + enum para que el error de validación sea claro y swagger muestre las opciones
export const Grupo = Type.Unsafe<"user" | "admin" | "superadmin">(
  Type.String({ enum: ["user", "admin", "superadmin"] }),
);

export const Usuario = Type.Object({
  id_usuario: Type.Integer(),
  username: Type.String({ maxLength: 30 }),
  nombres: Type.String(),
  apellidos: Type.String(),
  fecha_nacimiento: Type.String({ format: "date" }),
  nombre_completo: Type.String(),
  grupos: Type.Array(Grupo, { minItems: 1 }),
  activo: Type.Boolean(),
});
export type Usuario = Static<typeof Usuario>;

export const CrearUsuario = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 30 }),
  nombres: Type.String({ minLength: 1 }),
  apellidos: Type.String({ minLength: 1 }),
  fecha_nacimiento: Type.String({ format: "date" }),
  grupos: Type.Optional(Type.Array(Grupo, { minItems: 1, uniqueItems: true })),
  password: Type.String({ minLength: 8 }),
});
export type CrearUsuarioType = Static<typeof CrearUsuario>;

// El username y la contraseña no se cambian por acá
export const ActualizarUsuario = Type.Partial(
  Type.Object({
    nombres: Type.String({ minLength: 1 }),
    apellidos: Type.String({ minLength: 1 }),
    fecha_nacimiento: Type.String({ format: "date" }),
    grupos: Type.Array(Grupo, { minItems: 1, uniqueItems: true }),
    activo: Type.Boolean(),
  }),
  { minProperties: 1 },
);
export type ActualizarUsuarioType = Static<typeof ActualizarUsuario>;

export const IdUsuarioParams = Type.Object({
  id_usuario: Type.Integer({ minimum: 1 }),
});
export type IdUsuarioParamsType = Static<typeof IdUsuarioParams>;
