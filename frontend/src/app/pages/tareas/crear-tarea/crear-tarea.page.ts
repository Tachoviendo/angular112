import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TareaCard } from '../../../components/tarea-card/tarea-card';
import { TareaDto } from '../../../model/tarea';
import { TareaService } from '../../../services/tarea.service';

@Component({
  imports: [TareaCard, RouterLink],
  selector: 'app-crear-tarea',
  styleUrl: './crear-tarea.page.css',
  templateUrl: './crear-tarea.page.html',
})
export class CrearTareaPage {
  private readonly tareaService = inject(TareaService);
  private readonly router = inject(Router);

  protected async crear(dto: TareaDto) {
    await this.tareaService.crear(dto);
    this.router.navigate(['/tareas']);
  }
}
