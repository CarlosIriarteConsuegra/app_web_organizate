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

  constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService,
    private loadingService: LoadingService) {
    super(http, configUrlService);
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
      this.loadingService.ejecutarLoading("Eliminando usuarios...");
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: usuario
      };

      this.http.delete<any>(`${environment.microproxy_cursos}usuarios`, httpOptions).subscribe({
        next: async (data) => {
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Usuario ${usuario.nombre} eliminado`, life: 3000 });
          this.loadingService.finalizarLoading();
        },
        error: (error) => {
          usuarios = usuarios.filter(user => user.id != usuario.id);
          this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
          this.loadingService.finalizarLoading();
        }
      })

    }

    return usuarios;
  }

  deleteEliminarUsuario(usuario: UsuariosDTO) {
    this.loadingService.ejecutarLoading("Eliminando usuario...");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: usuario
    };
    this.http.delete<any>(`${environment.microproxy_seguridad}usuarios`, httpOptions).subscribe({
      next: async (data) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Usuario ${usuario.nombre} eliminado`, life: 3000 });
        this.loadingService.finalizarLoading();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
        this.loadingService.finalizarLoading();
      }
    })
  }
}
