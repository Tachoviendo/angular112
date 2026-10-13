// Mismos campos que la tabla tareas de api/db/00.sql
import { Grupo } from './usuario';

export type Prioridad = '0:baja' | '1:media' | '2:alta';

export type Tarea = {
  id_tarea: number;
  id_creador: number;
  grupo: Grupo;
  titulo: string;
  descripcion: string | null;
  prioridad: Prioridad;
  creada: string;
  terminada: string | null;
  estado: 'Abierta' | 'Cerrada';
};
