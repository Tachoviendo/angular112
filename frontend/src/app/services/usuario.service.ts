import { Service } from '@angular/core';

import { Usuario } from '../model/usuario';

@Service()
export class UsuarioService {
  private usuarios: Usuario[] = [];
}
