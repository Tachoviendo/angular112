import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UsuarioForm } from '../../../components/usuario-form/usuario-form';
import { UsuarioDto } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [UsuarioForm, RouterLink],
  selector: 'app-crear-usuario',
  styleUrl: './crear-usuario.page.css',
  templateUrl: './crear-usuario.page.html',
})
export class CrearUsuarioPage {
  private readonly usuarioService = inject(UsuarioService);
  private readonly router = inject(Router);

  protected async crear(dto: UsuarioDto) {
    await this.usuarioService.crear(dto);
    this.router.navigate(['/usuarios']);
  }
}
