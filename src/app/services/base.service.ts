import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { ConfigUrlService } from "../../core/configUrl-service";
import { TokenService } from "./seguridad/token.service";
import { LoadingService } from "../components/loadingWindow/loading.service";
import { MessageService } from "primeng/api";

export class BaseService {
  constructor(
    protected http: HttpClient,
    configUrlService: ConfigUrlService,
    protected messageService: MessageService,
    protected loadingService: LoadingService,
    private tokenService?: TokenService,
    ) {

  }

  getHeaderAuth() {
    return { headers: { Authorization: `Bearer ${this.tokenService ? this.tokenService.getToken() : null}` } }
  }

  delete(entidad: any, url:string, mensajeCarga: string, mensajeRespuesta: string) {
    this.loadingService.ejecutarLoading(mensajeCarga);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: entidad
    };
    this.http.delete<any>(url, httpOptions).subscribe({
      next: async (data) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: mensajeRespuesta, life: 3000 });
        this.loadingService.finalizarLoading();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
        this.loadingService.finalizarLoading();
      }
    })
  }
}