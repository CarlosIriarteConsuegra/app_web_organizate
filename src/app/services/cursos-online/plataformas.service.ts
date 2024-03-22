import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlataformaDTO } from '../../models/cursos/plataforma.dto';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable()
export class PlataformasService extends BaseService{

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService, private loadingService: LoadingService) { 
        super(http, configUrlService);
    }

    getPlataforms() {
        return this.http.get<PlataformaDTO[]>(`${environment.microproxy_cursos}plataformas`);
    }

    postPlataform(plataform: PlataformaDTO) {
        return this.http.post<PlataformaDTO>(`${environment.microproxy_cursos}plataformas`, plataform);
    }

    putPlataform(plataform: PlataformaDTO) {
        return this.http.put<PlataformaDTO>(`${environment.microproxy_cursos}plataformas`, plataform);
    }

    deletePlataforms(plataforms: PlataformaDTO[]) {
        this.loadingService.ejecutarLoading("Eliminando plataformas...");
        for (let plataform of plataforms) {
            if (plataform.cursosPlataforma && plataform.cursosPlataforma.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Plataforma con cursos', detail: `La plataforma ${plataform.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
                plataforms = plataforms.filter(plataforma => plataforma.id != plataform.id);
                this.loadingService.finalizarLoading();
            } else {
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                    body: plataform
                };

                this.http.delete<any>(`${environment.microproxy_cursos}plataformas`, httpOptions).subscribe({
                    next: async (data) => {
                        console.log('Solicitud DELETE exitosa', data);
                        this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Plataforma ${plataform.nombre} eliminada`, life: 3000 });
                        this.loadingService.finalizarLoading();
                    },
                    error: (error) => {
                        console.log('Solicitud DELETE error', error);
                        plataforms = plataforms.filter(plataforma => plataforma.id != plataform.id);
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        this.loadingService.finalizarLoading();
                    }
                })
            }
        }

        return plataforms;
    }

    deletePlataform(plataform: PlataformaDTO) {
        this.loadingService.ejecutarLoading("Eliminando plataformas...");
        if (plataform.cursosPlataforma && plataform.cursosPlataforma.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Plataforma con cursos', detail: `La plataforma ${plataform.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
            this.loadingService.finalizarLoading();
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: plataform
            };

            this.http.delete<any>(`${environment.microproxy_cursos}plataformas`, httpOptions).subscribe({
                next: async (data) => {
                    console.log('Solicitud DELETE exitosa', data);
                    this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Plataforma ${plataform.nombre} eliminada`, life: 3000 });
                    this.loadingService.finalizarLoading();
                },
                error: (error) => {
                    console.log('Solicitud DELETE error', error);
                    this.messageService.add({ severity: 'error', summary: 'Error Eliminar', detail: `Error al eliminar la plataforma ${plataform.nombre}`, life: 3000 });
                    this.loadingService.finalizarLoading();
                }
            })
        }
    }
}
