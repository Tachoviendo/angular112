import { myPool } from "../db/database.ts";
import { NotFoundError } from "../errors/response.errors.ts";
import type {
  ActualizarTareaType,
  CrearTareaType,
  Tarea,
} from "../schemas/tareas.ts";

class TareasRepository {
  private readonly baseQuery = `
    SELECT * FROM tareas T
  `;

  async obtenerTodas(): Promise<Tarea[]> {
    const query = `
      ${this.baseQuery}
      ORDER BY creada DESC;
    `;
    const result = await myPool.query(query);
    return result.rows;
  }

  async obtenerPorId(idTarea: number): Promise<Tarea> {
    const query = `
      ${this.baseQuery}
      WHERE id_tarea = $1;
    `;
    const result = await myPool.query(query, [idTarea]);
    if (result.rowCount !== 1) {
      throw new NotFoundError("Tarea no encontrada.");
    }
    return result.rows[0];
  }

  async crear(idCreador: number, dto: CrearTareaType): Promise<Tarea> {
    const query = `
      INSERT INTO tareas (id_creador, grupo, titulo, descripcion, prioridad)
      VALUES ($1, $2, $3, $4, COALESCE($5, '1:media'))
      RETURNING id_tarea;
    `;
    const result = await myPool.query(query, [
      idCreador,
      dto.grupo,
      dto.titulo,
      dto.descripcion ?? null,
      dto.prioridad,
    ]);

    return this.obtenerPorId(result.rows[0].id_tarea);
  }

  async actualizar(idTarea: number, dto: ActualizarTareaType): Promise<Tarea> {
    const campos: string[] = [];
    const valores: any[] = [];
    let idx = 1;

    if (dto.titulo !== undefined) {
      campos.push(`titulo = $${idx++}`);
      valores.push(dto.titulo);
    }
    if (dto.descripcion !== undefined) {
      campos.push(`descripcion = $${idx++}`);
      valores.push(dto.descripcion);
    }
    if (dto.grupo !== undefined) {
      campos.push(`grupo = $${idx++}`);
      valores.push(dto.grupo);
    }
    if (dto.prioridad !== undefined) {
      campos.push(`prioridad = $${idx++}`);
      valores.push(dto.prioridad);
    }

    if (campos.length === 0) {
      return this.obtenerPorId(idTarea);
    }

    valores.push(idTarea);
    const query = `
      UPDATE tareas
      SET ${campos.join(", ")}
      WHERE id_tarea = $${idx};
    `;

    await myPool.query(query, valores);
    return this.obtenerPorId(idTarea);
  }

  async finalizar(idTarea: number, fecha?: string): Promise<Tarea> {
    let terminadaValor = "CURRENT_TIMESTAMP";
    const params = [idTarea];
    if (fecha) {
      params.push();
      terminadaValor = "$2";
    }
    const query = `
      UPDATE tareas
      SET terminada = ${terminadaValor}
      WHERE id_tarea = $1 AND terminada IS NULL;
    `;

    await myPool.query(query, [idTarea, fecha]);
    return this.obtenerPorId(idTarea);
  }

  async eliminar(idTarea: number): Promise<void> {
    await this.obtenerPorId(idTarea);
    const query = `
      DELETE FROM tareas
      WHERE id_tarea = $1;
    `;
    await myPool.query(query, [idTarea]);
  }
}

export const tareasRepo = new TareasRepository();
