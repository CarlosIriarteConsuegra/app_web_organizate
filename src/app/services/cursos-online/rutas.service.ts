import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutaDTO } from '../../models/cursos/ruta.dto';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { BaseService } from '../base.service';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable()
export class RutasService extends BaseService {

    constructor(http: HttpClient, messageService: MessageService, configUrlService: ConfigUrlService, loadingService: LoadingService) { 
        super(http, configUrlService, messageService, loadingService);
    }

    getRutas() {
        return this.http.get<RutaDTO[]>(`${environment.microproxy_cursos}rutas`);
    }

    postRuta(ruta: RutaDTO) {
        return this.http.post<RutaDTO>(`${environment.microproxy_cursos}rutas`, ruta);
    }

    putRuta(ruta: RutaDTO) {
        return this.http.put<RutaDTO>(`${environment.microproxy_cursos}rutas`, ruta);
    }

    deleteRutas(rutas: RutaDTO[]) {
        for (let ruta of rutas) {
            this.delete(ruta, `${environment.microproxy_cursos}rutas`, "Eliminando rutas...", `Ruta ${ruta.nombre} eliminada`);
        }
        return rutas;
    }

    deleteRuta(ruta: RutaDTO) {
        this.delete(ruta, `${environment.microproxy_cursos}rutas`, "Eliminando ruta...", `Ruta ${ruta.nombre} eliminada`);
    }
}