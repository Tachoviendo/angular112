import { Type } from "@sinclair/typebox";

import { Usuario } from "./usuarios.ts";

export const Login = Type.Object({
  username: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 }),
});

export const LoginRespuesta = Type.Object({
  token: Type.String(),
  usuario: Usuario,
});
