import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { ConfigUrlService } from "../../core/configUrl-service";
import { TokenService } from "./seguridad/token.service";

export class BaseService {
    constructor(protected http: HttpClient, configUrlService: ConfigUrlService, private tokenService?: TokenService) {
      
    }

    getHeaderAuth() {
      return {headers: { Authorization: `Bearer ${this.tokenService ? this.tokenService.getToken(): null}` }}
    }
}