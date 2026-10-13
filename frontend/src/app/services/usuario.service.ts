import { Service } from '@angular/core';

import { Usuario, UsuarioDto } from '../model/usuario';

@Service()
export class UsuarioService {
  // Mismos datos que el seed de api/db/00.sql
  private usuarios: Usuario[] = [
    {
      id_usuario: 1,
      username: 'superadmin',
      nombres: 'EL',
      apellidos: 'SUPERADMIN',
      fecha_nacimiento: '1995-12-08',
      nombre_completo: 'EL SUPERADMIN',
      grupos: ['superadmin'],
      activo: true,
    },
    {
      id_usuario: 2,
      username: 'admin',
      nombres: 'Administrador',
      apellidos: 'Sistema',
      fecha_nacimiento: '1985-03-15',
      nombre_completo: 'Administrador Sistema',
      grupos: ['admin', 'user'],
      activo: true,
    },
    {
      id_usuario: 3,
      username: 'user',
      nombres: 'Un',
      apellidos: 'User',
      fecha_nacimiento: '1993-07-22',
      nombre_completo: 'Un User',
      grupos: ['user'],
      activo: true,
    },
    {
      id_usuario: 4,
      username: 'mgonzalez',
      nombres: 'Martín',
      apellidos: 'González',
      fecha_nacimiento: '1992-07-22',
      nombre_completo: 'Martín González',
      grupos: ['user'],
      activo: true,
    },
    {
      id_usuario: 5,
      username: 'srodriguez',
      nombres: 'Sofía',
      apellidos: 'Rodríguez',
      fecha_nacimiento: '1995-11-08',
      nombre_completo: 'Sofía Rodríguez',
      grupos: ['user'],
      activo: true,
    },
    {
      id_usuario: 6,
      username: 'lfernandez',
      nombres: 'Lucas',
      apellidos: 'Fernández',
      fecha_nacimiento: '2010-01-30',
      nombre_completo: 'Lucas Fernández',
      grupos: ['user'],
      activo: true,
    },
  ];

  // Los métodos son async para que la página los use igual que cuando sea la api

  async obtenerTodos(): Promise<Usuario[]> {
    return [...this.usuarios];
  }

  async obtenerPorId(idUsuario: number): Promise<Usuario | undefined> {
    const usuario = this.usuarios.find((u) => u.id_usuario === idUsuario);
    // Copia para que el form no modifique el array sin guardar
    return usuario ? { ...usuario, grupos: [...usuario.grupos] } : undefined;
  }

  async crear(dto: UsuarioDto): Promise<Usuario> {
    const idUsuario = Math.max(0, ...this.usuarios.map((u) => u.id_usuario)) + 1;
    const nuevo: Usuario = {
      ...dto,
      id_usuario: idUsuario,
      nombre_completo: `${dto.nombres} ${dto.apellidos}`,
    };
    this.usuarios.push(nuevo);
    return nuevo;
  }

  async actualizar(idUsuario: number, dto: UsuarioDto): Promise<Usuario> {
    const indice = this.usuarios.findIndex((u) => u.id_usuario === idUsuario);
    if (indice === -1) throw new Error('Usuario no encontrado.');

    const actualizado: Usuario = {
      ...dto,
      id_usuario: idUsuario,
      nombre_completo: `${dto.nombres} ${dto.apellidos}`,
    };
    this.usuarios[indice] = actualizado;
    return actualizado;
  }

  async eliminar(idUsuario: number): Promise<void> {
    this.usuarios = this.usuarios.filter((u) => u.id_usuario !== idUsuario);
  }
}
