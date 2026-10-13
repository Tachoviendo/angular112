import { Component, inject, input, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TareaCard } from '../../../components/tarea-card/tarea-card';
import { TareaDto } from '../../../model/tarea';
import { TareaService } from '../../../services/tarea.service';

@Component({
  imports: [TareaCard, RouterLink],
  selector: 'app-editar-tarea',
  styleUrl: './editar-tarea.page.css',
  templateUrl: './editar-tarea.page.html',
})
export class EditarTareaPage {
  private readonly tareaService = inject(TareaService);
  private readonly router = inject(Router);

  // Viene del :id_tarea de la ruta (withComponentInputBinding en app.config)
  readonly idTarea = input.required<string>({ alias: 'id_tarea' });

  protected readonly tarea = resource({
    params: () => ({ id: Number(this.idTarea()) }),
    loader: ({ params }) => this.tareaService.obtenerPorId(params.id),
  });

  protected async actualizar(dto: TareaDto) {
    await this.tareaService.actualizar(Number(this.idTarea()), dto);
    this.router.navigate(['/tareas']);
  }
}
