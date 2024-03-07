import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutaModel } from '../../models/cursos/ruta.model';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { BaseService } from '../base.service';
import { ConfigUrlService } from '../../../core/configUrl-service';

@Injectable()
export class RutasService extends BaseService {

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) { 
        super(http, configUrlService);
    }

    getRutas() {
        return this.http.get<RutaModel[]>(`${environment.microproxy_cursos}rutas`);
    }

    postRuta(ruta: RutaModel) {
        return this.http.post<RutaModel>(`${environment.microproxy_cursos}rutas`, ruta);
    }

    putRuta(ruta: RutaModel) {
        return this.http.put<RutaModel>(`${environment.microproxy_cursos}rutas`, ruta);
    }

    deleteRutas(rutas: RutaModel[]) {
        for (let ruta of rutas) {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: ruta
            };

            this.http.delete<any>(`${environment.microproxy_cursos}rutas`, httpOptions).subscribe({
                next: async (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Ruta ${ruta.nombre} eliminada`, life: 3000 });
                },
                error: (error) => {
                    rutas = rutas.filter(ruts => ruts.id != ruta.id);
                    this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                }
            })

        }

        return rutas;
    }

    deleteRuta(ruta: RutaModel) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: ruta
        };

        this.http.delete<any>(`${environment.microproxy_cursos}rutas`, httpOptions).subscribe({
            next: async (data) => {
                this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Ruta ${ruta.nombre} eliminada`, life: 3000 });
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
            }
        })

    }
}