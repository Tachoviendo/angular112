import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, maxLength, required, submit, validate } from '@angular/forms/signals';

import { UsuarioDto } from '../../services/usuario.service';

// Los grupos van como checkboxes, por eso el form tiene un boolean por grupo
type UsuarioFormModel = {
  username: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  user: boolean;
  admin: boolean;
  superadmin: boolean;
  activo: boolean;
};

@Component({
  imports: [FormField],
  selector: 'app-usuario-form',
  styleUrl: './usuario-form.css',
  templateUrl: './usuario-form.html',
})
export class UsuarioForm {
  // Si no viene usuario es porque se está creando uno nuevo
  readonly usuario = input<UsuarioDto>();
  readonly guardar = output<UsuarioDto>();

  protected readonly modelo = linkedSignal<UsuarioFormModel>(() => {
    const usuario = this.usuario();
    return {
      username: usuario?.username ?? '',
      nombres: usuario?.nombres ?? '',
      apellidos: usuario?.apellidos ?? '',
      fecha_nacimiento: usuario?.fecha_nacimiento ?? '',
      user: usuario ? usuario.grupos.includes('user') : true,
      admin: usuario?.grupos.includes('admin') ?? false,
      superadmin: usuario?.grupos.includes('superadmin') ?? false,
      activo: usuario?.activo ?? true,
    };
  });

  protected readonly formulario = form(this.modelo, (campos) => {
    required(campos.username, { message: 'El username es obligatorio.' });
    maxLength(campos.username, 30, { message: 'Máximo 30 caracteres.' });
    required(campos.nombres, { message: 'Los nombres son obligatorios.' });
    required(campos.apellidos, { message: 'Los apellidos son obligatorios.' });
    required(campos.fecha_nacimiento, { message: 'La fecha de nacimiento es obligatoria.' });
    validate(campos.user, ({ valueOf }) =>
      !valueOf(campos.user) && !valueOf(campos.admin) && !valueOf(campos.superadmin)
        ? { kind: 'sinGrupo', message: 'Elegí al menos un grupo.' }
        : undefined,
    );
  });

  protected enviar(event: Event) {
    event.preventDefault();
    // submit solo ejecuta la función si el form es válido
    submit(this.formulario, async () => {
      const m = this.modelo();
      this.guardar.emit({
        username: m.username,
        nombres: m.nombres,
        apellidos: m.apellidos,
        fecha_nacimiento: m.fecha_nacimiento,
        grupos: [
          ...(m.user ? (['user'] as const) : []),
          ...(m.admin ? (['admin'] as const) : []),
          ...(m.superadmin ? (['superadmin'] as const) : []),
        ],
        activo: m.activo,
      });
    });
  }
}
