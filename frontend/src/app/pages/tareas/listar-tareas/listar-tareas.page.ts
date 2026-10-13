import { Component, inject, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TareaCard } from '../../../components/tarea-card/tarea-card';
import { TareaService } from '../../../services/tarea.service';

@Component({
  imports: [TareaCard, RouterLink],
  selector: 'app-listar-tareas',
  styleUrl: './listar-tareas.page.css',
  templateUrl: './listar-tareas.page.html',
})
export class ListarTareasPage {
  private readonly tareaService = inject(TareaService);
  private readonly router = inject(Router);

  protected readonly tareas = resource({
    loader: () => this.tareaService.obtenerTodas(),
  });

  protected editar(idTarea: number) {
    this.router.navigate(['/tareas', idTarea]);
  }

  protected async eliminar(idTarea: number) {
    if (!confirm('¿Eliminar esta tarea?')) return;
    await this.tareaService.eliminar(idTarea);
    this.tareas.reload();
  }
}
