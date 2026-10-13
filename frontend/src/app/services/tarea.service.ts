import { Service } from '@angular/core';

import { Tarea } from '../model/tarea';

@Service()
export class TareaService {
  private tareas: Tarea[] = [];
}
