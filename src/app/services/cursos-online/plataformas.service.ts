import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlataformaModel } from '../../models/cursos/plataforma.model';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';

@Injectable()
export class PlataformasService extends BaseService{

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) { 
        super(http, configUrlService);
    }

    getPlataforms() {
        return this.http.get<PlataformaModel[]>(`${environment.microproxy_cursos}plataformas`);
    }

    postPlataform(plataform: PlataformaModel) {
        return this.http.post<PlataformaModel>(`${environment.microproxy_cursos}plataformas`, plataform);
    }

    putPlataform(plataform: PlataformaModel) {
        return this.http.put<PlataformaModel>(`${environment.microproxy_cursos}plataformas`, plataform);
    }

    deletePlataforms(plataforms: PlataformaModel[]) {
        for (let plataform of plataforms) {
            if (plataform.cursosPlataforma && plataform.cursosPlataforma.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Plataforma con cursos', detail: `La plataforma ${plataform.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
                plataforms = plataforms.filter(plataforma => plataforma.id != plataform.id);
            } else {
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                    body: plataform
                };

                this.http.delete<any>(`${environment.microproxy_cursos}plataformas`, httpOptions).subscribe({
                    next: async (data) => {
                        console.log('Solicitud DELETE exitosa', data);
                        this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Plataforma ${plataform.nombre} eliminada`, life: 3000 });
                    },
                    error: (error) => {
                        console.log('Solicitud DELETE error', error);
                        plataforms = plataforms.filter(plataforma => plataforma.id != plataform.id);
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                    }
                })
            }
        }

        return plataforms;
    }

    deletePlataform(plataform: PlataformaModel) {
        if (plataform.cursosPlataforma && plataform.cursosPlataforma.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Plataforma con cursos', detail: `La plataforma ${plataform.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: plataform
            };

            this.http.delete<any>(`${environment.microproxy_cursos}plataformas`, httpOptions).subscribe({
                next: async (data) => {
                    console.log('Solicitud DELETE exitosa', data);
                    this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Plataforma ${plataform.nombre} eliminada`, life: 3000 });
                },
                error: (error) => {
                    console.log('Solicitud DELETE error', error);
                    this.messageService.add({ severity: 'error', summary: 'Error Eliminar', detail: `Error al eliminar la plataforma ${plataform.nombre}`, life: 3000 });
                }
            })
        }
    }
}
