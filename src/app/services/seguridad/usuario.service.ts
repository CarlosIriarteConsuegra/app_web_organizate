import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { environment } from '../../../enviroments/environment';
import { UsuariosDTO } from '../../models/seguridad/usuarios.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) {
    super(http, configUrlService);
  }

  getUsuarios() {
    return this.http.get(`${environment.microproxy_seguridad}usuarios`);
  }

  postCrearUsuario(usuario: UsuariosDTO) {
    return this.http.post<UsuariosDTO>(`${environment.microproxy_cursos}usuarios`, usuario);
  }

  postRegistrarUsuario(usuario: UsuariosDTO) {
    return this.http.post<UsuariosDTO>(`${environment.microproxy_cursos}usuarios/registrar`, usuario);
  }
}
