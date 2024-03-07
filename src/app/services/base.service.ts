import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { ConfigUrlService } from "../../core/configUrl-service";

export class BaseService {
    constructor(protected http: HttpClient, configUrlService: ConfigUrlService) {
      environment.microproxy_cursos = configUrlService.getApi("microproxy_cursos");
    }
}