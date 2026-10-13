import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Tarea } from '../../model/tarea';

// La card no usa el service: solo muestra la tarea y avisa a la página con outputs
@Component({
  imports: [DatePipe],
  selector: 'app-tarea-card',
  styleUrl: './tarea-card.css',
  templateUrl: './tarea-card.html',
})
export class TareaCard {
  readonly tarea = input.required<Tarea>();

  readonly editar = output<number>();
  readonly eliminar = output<number>();

  // '2:alta' -> 'alta'
  protected prioridadTexto(prioridad: string) {
    return prioridad.split(':')[1];
  }
}
