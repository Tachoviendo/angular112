import { Component, inject, input, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UsuarioForm } from '../../../components/usuario-form/usuario-form';
import { UsuarioDto } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [UsuarioForm, RouterLink],
  selector: 'app-editar-usuario',
  styleUrl: './editar-usuario.page.css',
  templateUrl: './editar-usuario.page.html',
})
export class EditarUsuarioPage {
  private readonly usuarioService = inject(UsuarioService);
  private readonly router = inject(Router);

  // Viene del :id_usuario de la ruta (withComponentInputBinding en app.config)
  readonly idUsuario = input.required<string>({ alias: 'id_usuario' });

  protected readonly usuario = resource({
    params: () => ({ id: Number(this.idUsuario()) }),
    loader: ({ params }) => this.usuarioService.obtenerPorId(params.id),
  });

  protected async actualizar(dto: UsuarioDto) {
    await this.usuarioService.actualizar(Number(this.idUsuario()), dto);
    this.router.navigate(['/usuarios']);
  }
}
