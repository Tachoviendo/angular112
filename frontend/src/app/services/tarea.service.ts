import { Service } from '@angular/core';

import { Tarea, TareaDto } from '../model/tarea';

// Igual que "CURRENT_TIMESTAMP - INTERVAL 'x hours'" del seed
function haceHoras(horas: number): string {
  return new Date(Date.now() - horas * 60 * 60 * 1000).toISOString();
}

function haceDias(dias: number): string {
  return haceHoras(dias * 24);
}

function calcularEstado(terminada: string | null): Tarea['estado'] {
  return terminada ? 'Cerrada' : 'Abierta';
}

@Service()
export class TareaService {
  // Mismos datos que el seed de api/db/00.sql
  private tareas: Tarea[] = [
    {
      id_tarea: 1,
      id_creador: 1,
      grupo: 'superadmin',
      titulo: 'Promover a usuario jperez a rol admin',
      descripcion: 'Aprobar la solicitud de permisos elevados tras auditoría de seguridad.',
      prioridad: '2:alta',
      creada: haceDias(2),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 2,
      id_creador: 1,
      grupo: 'superadmin',
      titulo: 'Depurar logs de auditoría del sistema',
      descripcion: 'Realizar purga de registros antiguos mayores a 90 días en la base de datos.',
      prioridad: '1:media',
      creada: haceDias(5),
      terminada: haceDias(1),
      estado: 'Cerrada',
    },
    {
      id_tarea: 3,
      id_creador: 1,
      grupo: 'superadmin',
      titulo: 'Renovar llaves maestras de cifrado JWT',
      descripcion: 'Rotación anual de secretos para tokens de autenticación.',
      prioridad: '2:alta',
      creada: haceDias(1),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 4,
      id_creador: 1,
      grupo: 'superadmin',
      titulo: 'Crear cuenta de administrador para auditoría externa',
      descripcion: 'Dar de alta al usuario temporal audit_ext con rol admin.',
      prioridad: '0:baja',
      creada: haceDias(3),
      terminada: haceDias(2),
      estado: 'Cerrada',
    },
    {
      id_tarea: 5,
      id_creador: 1,
      grupo: 'admin',
      titulo: 'Revisar reportes de usuarios bloqueados',
      descripcion: 'Verificar intentos fallidos de inicio de sesión de la última semana.',
      prioridad: '1:media',
      creada: haceHoras(12),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 6,
      id_creador: 1,
      grupo: 'admin',
      titulo: 'Actualizar documentación de la API',
      descripcion:
        'Sincronizar la especificación Swagger con las rutas de Fastify recientemente agregadas.',
      prioridad: '0:baja',
      creada: haceDias(3),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 7,
      id_creador: 1,
      grupo: 'admin',
      titulo: 'Monitorear uso de recursos del servidor',
      descripcion: 'Evaluar consumo de CPU y memoria tras el último despliegue.',
      prioridad: '2:alta',
      creada: haceDias(1),
      terminada: haceHoras(2),
      estado: 'Cerrada',
    },
    {
      id_tarea: 8,
      id_creador: 1,
      grupo: 'admin',
      titulo: 'Mantenimiento programado de base de datos',
      descripcion: 'Ejecutar VACUUM ANALYZE durante la ventana de bajo tráfico.',
      prioridad: '1:media',
      creada: haceDias(4),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 9,
      id_creador: 1,
      grupo: 'user',
      titulo: 'Verificar configuración del repositorio',
      descripcion:
        'Verificar Verificar que el proyecto levanta y funciona sin problemas de configuraciòn.',
      prioridad: '0:baja',
      creada: haceDias(10),
      terminada: haceDias(9),
      estado: 'Cerrada',
    },
    {
      id_tarea: 10,
      id_creador: 1,
      grupo: 'user',
      titulo: 'Seleccionar método de pago',
      descripcion: 'Seleccionar y fundamente el método de pago a usar en el proyecto.',
      prioridad: '2:alta',
      creada: haceHoras(6),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 11,
      id_creador: 1,
      grupo: 'user',
      titulo: 'Tests',
      descripcion: 'Revisar que están funcionando los tests unitarios.',
      prioridad: '1:media',
      creada: haceDias(2),
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 12,
      id_creador: 1,
      grupo: 'user',
      titulo: 'Tests',
      descripcion: 'Revisar los tests de integración.',
      prioridad: '0:baja',
      creada: haceDias(1),
      terminada: haceHoras(4),
      estado: 'Cerrada',
    },
  ];

  // Los métodos son async para que la página los use igual que cuando sea la api

  async obtenerTodas(): Promise<Tarea[]> {
    // Igual que el repository de la api: las más nuevas primero
    return [...this.tareas].sort((a, b) => b.creada.localeCompare(a.creada));
  }

  async obtenerPorId(idTarea: number): Promise<Tarea | undefined> {
    const tarea = this.tareas.find((t) => t.id_tarea === idTarea);
    // Copia para que la card no modifique el array sin guardar
    return tarea ? { ...tarea } : undefined;
  }

  async crear(dto: TareaDto): Promise<Tarea> {
    const idTarea = Math.max(0, ...this.tareas.map((t) => t.id_tarea)) + 1;
    const nueva: Tarea = {
      ...dto,
      id_tarea: idTarea,
      creada: new Date().toISOString(),
      estado: calcularEstado(dto.terminada),
    };
    this.tareas.push(nueva);
    return nueva;
  }

  async actualizar(idTarea: number, dto: TareaDto): Promise<Tarea> {
    const indice = this.tareas.findIndex((t) => t.id_tarea === idTarea);
    if (indice === -1) throw new Error('Tarea no encontrada.');

    const actualizada: Tarea = {
      ...dto,
      id_tarea: idTarea,
      creada: this.tareas[indice].creada,
      estado: calcularEstado(dto.terminada),
    };
    this.tareas[indice] = actualizada;
    return actualizada;
  }

  async eliminar(idTarea: number): Promise<void> {
    this.tareas = this.tareas.filter((t) => t.id_tarea !== idTarea);
  }
}
