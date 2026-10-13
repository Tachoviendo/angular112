# angular112

Repositorio con dos proyectos independientes: una API RESTful y un frontend en Angular. No están conectados entre sí.

## API (`api/`)

Fastify + PostgreSQL, con documentación Swagger.

```bash
cd api
cp .env.example .env
pnpm install
pnpm db:up      # levanta postgres con docker y carga db/00.sql
pnpm dev
```

- Swagger: http://localhost:3000/documentation
- Usuarios de prueba: `superadmin`, `admin`, `user`, `mgonzalez`, `srodriguez`, `lfernandez`. Contraseña: `Contraseña1`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/login` | Devuelve un token JWT |
| GET | `/auth/me` | Datos del usuario autenticado |
| GET | `/usuarios` | Listar usuarios |
| GET | `/usuarios/:id_usuario` | Obtener un usuario |
| POST | `/usuarios` | Crear usuario (admin) |
| PATCH | `/usuarios/:id_usuario` | Modificar usuario (admin) |
| DELETE | `/usuarios/:id_usuario` | Borrar usuario (admin) |
| GET | `/tareas` | Listar tareas |
| GET | `/tareas/:id_tarea` | Obtener una tarea |
| POST | `/tareas` | Crear tarea |
| PATCH | `/tareas/:id_tarea` | Modificar tarea |
| PATCH | `/tareas/:id_tarea/finalizar` | Marcar tarea como terminada |
| DELETE | `/tareas/:id_tarea` | Borrar tarea |

Todas las rutas salvo el login piden el header `Authorization: Bearer <token>`.

## Frontend (`frontend/`)

Angular. Los datos están en arrays dentro de `UsuarioService` y `TareaService`, con los mismos datos que la API.

```bash
cd frontend
pnpm install
pnpm start
```

http://localhost:4200

| Ruta | Descripción |
|---|---|
| `/usuarios` | Tabla de usuarios con editar y borrar |
| `/usuarios/crear` | Crear usuario con `UsuarioForm` |
| `/usuarios/:id_usuario` | Editar usuario con `UsuarioForm` |
| `/tareas` | Tarjetas de tareas con `TareaCard` |
| `/tareas/crear` | Crear tarea con `TareaCard` |
| `/tareas/:id_tarea` | Editar tarea con `TareaCard` |
