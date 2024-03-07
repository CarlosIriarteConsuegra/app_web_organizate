import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { ProfesorModel } from '../../models/cursos/profesor.model';
import { BaseService } from '../base.service';
import { ConfigUrlService } from '../../../core/configUrl-service';

@Injectable()
export class ProfesoresService extends BaseService {

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) { 
        super(http, configUrlService);
    }

    getProfesores() {
        return this.http.get<ProfesorModel[]>(`${environment.microproxy_cursos}profesores`);
    }

    postProfesor(profesor: ProfesorModel) {
        return this.http.post<ProfesorModel>(`${environment.microproxy_cursos}profesores`, profesor);
    }

    putProfesor(profesor: ProfesorModel) {
        return this.http.put<ProfesorModel>(`${environment.microproxy_cursos}profesores`, profesor);
    }

    deleteProfesores(profesores: ProfesorModel[]): ProfesorModel[] {
        for (let profesor of profesores) {
            if (profesor.cursos && profesor.cursos.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Profesor con cursos', detail: `El profesor ${profesor.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
                profesores = profesores.filter(profe => profe.id !== profesor.id);
            } else {
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                    body: profesor
                };

                this.http.delete<any>(`${environment.microproxy_cursos}profesores`, httpOptions).subscribe({
                    next: async (data) => {
                        console.log('Solicitud DELETE exitosa', data);
                        this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Profesor ${profesor.nombre} eliminado`, life: 3000 });
                    },
                    error: (error) => {
                        console.log('Solicitud DELETE error', error);
                        profesores = profesores.filter(profe => profe.id !== profesor.id);
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                    }
                })
            }
        }

        return profesores;
    }

    deleteProfesor(profesor: ProfesorModel) {
        if (profesor.cursos && profesor.cursos.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Profesor con cursos', detail: `El profesor ${profesor.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: profesor
            };

            this.http.delete<any>(`${environment.microproxy_cursos}profesores`, httpOptions).subscribe({
                next: async (data) => {
                    console.log('Solicitud DELETE exitosa', data);
                    this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Profesor ${profesor.nombre} eliminado`, life: 3000 });
                },
                error: (error) => {
                    console.log('Solicitud DELETE error', error);
                    this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                }
            })
        }
    }
}
