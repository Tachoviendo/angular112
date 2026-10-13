import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },

  // 'crear' va antes de ':id' para que no lo tome como un id
  {
    path: 'usuarios',
    title: 'Usuarios',
    loadComponent: async () =>
      (await import('./pages/usuarios/listar-usuarios/listar-usuarios.page')).ListarUsuariosPage,
  },
  {
    path: 'usuarios/crear',
    title: 'Crear usuario',
    loadComponent: async () =>
      (await import('./pages/usuarios/crear-usuario/crear-usuario.page')).CrearUsuarioPage,
  },
  {
    path: 'usuarios/:id_usuario',
    title: 'Editar usuario',
    loadComponent: async () =>
      (await import('./pages/usuarios/editar-usuario/editar-usuario.page')).EditarUsuarioPage,
  },

  {
    path: 'tareas',
    title: 'Tareas',
    loadComponent: async () =>
      (await import('./pages/tareas/listar-tareas/listar-tareas.page')).ListarTareasPage,
  },
  {
    path: 'tareas/crear',
    title: 'Crear tarea',
    loadComponent: async () =>
      (await import('./pages/tareas/crear-tarea/crear-tarea.page')).CrearTareaPage,
  },
  {
    path: 'tareas/:id_tarea',
    title: 'Editar tarea',
    loadComponent: async () =>
      (await import('./pages/tareas/editar-tarea/editar-tarea.page')).EditarTareaPage,
  },

  {
    path: '**',
    redirectTo: 'usuarios',
  },
];
