import { DatePipe } from '@angular/common';
import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, maxLength, required, submit } from '@angular/forms/signals';

import { Grupo } from '../../model/usuario';
import { Prioridad, Tarea, TareaDto } from '../../model/tarea';

type TareaFormModel = {
  titulo: string;
  descripcion: string;
  grupo: Grupo;
  prioridad: Prioridad;
  terminada: boolean;
};

// La card no usa el service: muestra o edita la tarea y avisa a la página con outputs
@Component({
  imports: [DatePipe, FormField],
  selector: 'app-tarea-card',
  styleUrl: './tarea-card.css',
  templateUrl: './tarea-card.html',
})
export class TareaCard {
  // Si no viene tarea es porque se está creando una nueva
  readonly tarea = input<Tarea>();
  readonly editando = input(false);

  readonly editar = output<number>();
  readonly eliminar = output<number>();
  readonly guardar = output<TareaDto>();

  protected readonly modelo = linkedSignal<TareaFormModel>(() => {
    const tarea = this.tarea();
    return {
      titulo: tarea?.titulo ?? '',
      descripcion: tarea?.descripcion ?? '',
      grupo: tarea?.grupo ?? 'user',
      prioridad: tarea?.prioridad ?? '1:media',
      terminada: !!tarea?.terminada,
    };
  });

  protected readonly formulario = form(this.modelo, (campos) => {
    required(campos.titulo, { message: 'El título es obligatorio.' });
    maxLength(campos.titulo, 100, { message: 'Máximo 100 caracteres.' });
  });

  // '2:alta' -> 'alta'
  protected prioridadTexto(prioridad: string) {
    return prioridad.split(':')[1];
  }

  protected enviar(event: Event) {
    event.preventDefault();
    // submit solo ejecuta la función si el form es válido
    submit(this.formulario, async () => {
      const m = this.modelo();
      const tarea = this.tarea();
      this.guardar.emit({
        // Sin login en el front, las nuevas quedan creadas por el usuario 1 como en el seed
        id_creador: tarea?.id_creador ?? 1,
        titulo: m.titulo,
        descripcion: m.descripcion || null,
        grupo: m.grupo,
        prioridad: m.prioridad,
        // Si ya estaba terminada se mantiene la fecha original
        terminada: m.terminada ? (tarea?.terminada ?? new Date().toISOString()) : null,
      });
    });
  }
}
