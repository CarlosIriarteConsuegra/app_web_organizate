import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';
import { UsuariosDTO } from '../../models/seguridad/usuarios.dto';
import { environment } from '../../../enviroments/environment';
import { TokenDto } from '../../models/seguridad/token.dto';

@Injectable()
export class AuthService extends BaseService {

  constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) {
    super(http, configUrlService);
  }


  postLogin(usuario: UsuariosDTO) {
    return this.http.post<any>(`${environment.microproxy_seguridad}auth/login`, usuario);
  }

  postRefresh(token: TokenDto) {
    return this.http.post<any>(`${environment.microproxy_seguridad}auth/refresh`, token);
  }

}
