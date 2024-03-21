import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { ConfigUrlService } from "../../core/configUrl-service";
import { TokenService } from "./seguridad/token.service";

export class BaseService {
    constructor(protected http: HttpClient, configUrlService: ConfigUrlService, private tokenService?: TokenService) {
      environment.microproxy_cursos = configUrlService.getApi("microproxy_cursos");
      environment.microproxy_seguridad = configUrlService.getApi("microproxy_seguridad");
    }

    getHeaderAuth() {
      return {headers: { Authorization: `Bearer ${this.tokenService ? this.tokenService.getToken(): null}` }}
    }
}