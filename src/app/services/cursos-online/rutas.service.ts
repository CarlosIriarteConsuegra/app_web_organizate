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

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService, private loadingService: LoadingService) { 
        super(http, configUrlService);
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
            this.loadingService.ejecutarLoading("Eliminando rutas...");
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: ruta
            };

            this.http.delete<any>(`${environment.microproxy_cursos}rutas`, httpOptions).subscribe({
                next: async (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Ruta ${ruta.nombre} eliminada`, life: 3000 });
                    this.loadingService.finalizarLoading();
                },
                error: (error) => {
                    rutas = rutas.filter(ruts => ruts.id != ruta.id);
                    this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                    this.loadingService.finalizarLoading();
                }
            })

        }

        return rutas;
    }

    deleteRuta(ruta: RutaDTO) {
        this.loadingService.ejecutarLoading("Eliminando ruta...");
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: ruta
        };

        this.http.delete<any>(`${environment.microproxy_cursos}rutas`, httpOptions).subscribe({
            next: async (data) => {
                this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Ruta ${ruta.nombre} eliminada`, life: 3000 });
                this.loadingService.finalizarLoading();
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                this.loadingService.finalizarLoading();
            }
        })

    }
}