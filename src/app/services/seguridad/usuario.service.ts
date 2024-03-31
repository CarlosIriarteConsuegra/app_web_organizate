import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { environment } from '../../../enviroments/environment';
import { UsuariosDTO } from '../../models/seguridad/usuarios.dto';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor(http: HttpClient, configUrlService: ConfigUrlService, messageService: MessageService, loadingService: LoadingService) {
    super(http, configUrlService, messageService, loadingService);
  }

  getUsuarios() {
    return this.http.get<UsuariosDTO[]>(`${environment.microproxy_seguridad}usuarios`);
  }

  postCrearUsuario(usuario: UsuariosDTO) {
    return this.http.post<UsuariosDTO>(`${environment.microproxy_seguridad}usuarios`, usuario);
  }

  postRegistrarUsuario(usuario: UsuariosDTO) {
    return this.http.post<UsuariosDTO>(`${environment.microproxy_seguridad}usuarios/registrar`, usuario);
  }

  putActualizarUsuario(usuario: UsuariosDTO) {
    return this.http.put<UsuariosDTO>(`${environment.microproxy_seguridad}usuarios`, usuario);
  }

  eliminarUsuarios(usuarios: UsuariosDTO[]) {
    for (let usuario of usuarios) {
      this.delete(usuario, `${environment.microproxy_seguridad}usuarios`, "Eliminando usuarios...", `Usuario ${usuario.nombre} eliminado`);
    }

    return usuarios;
  }

  deleteEliminarUsuario(usuario: UsuariosDTO) {
    this.delete(usuario, `${environment.microproxy_seguridad}usuarios`, "Eliminando usuario...", `Usuario ${usuario.nombre} eliminado`);
  }
}
