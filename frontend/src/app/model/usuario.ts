// Mismos campos que la tabla usuarios de api/db/00.sql
export type Grupo = 'user' | 'admin' | 'superadmin';

export type Usuario = {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  nombre_completo: string;
  grupos: Grupo[];
  activo: boolean;
};

// Lo que se manda al crear o editar: los campos que calcula la "base" no van
export type UsuarioDto = Omit<Usuario, 'id_usuario' | 'nombre_completo'>;
