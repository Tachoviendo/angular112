import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [RouterLink],
  selector: 'app-listar-usuarios',
  styleUrl: './listar-usuarios.page.css',
  templateUrl: './listar-usuarios.page.html',
})
export class ListarUsuariosPage {
  private readonly usuarioService = inject(UsuarioService);

  protected readonly usuarios = resource({
    loader: () => this.usuarioService.obtenerTodos(),
  });

  protected async borrar(idUsuario: number) {
    if (!confirm('¿Borrar este usuario?')) return;
    await this.usuarioService.eliminar(idUsuario);
    this.usuarios.reload();
  }
}
