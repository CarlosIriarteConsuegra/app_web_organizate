import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { ProfesorDTO } from '../../models/cursos/profesor.dto';
import { BaseService } from '../base.service';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable()
export class ProfesoresService extends BaseService {

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService,
        private loadingService: LoadingService) { 
        super(http, configUrlService);
    }

    getProfesores() {
        return this.http.get<ProfesorDTO[]>(`${environment.microproxy_cursos}profesores`);
    }

    postProfesor(profesor: ProfesorDTO) {
        return this.http.post<ProfesorDTO>(`${environment.microproxy_cursos}profesores`, profesor);
    }

    putProfesor(profesor: ProfesorDTO) {
        return this.http.put<ProfesorDTO>(`${environment.microproxy_cursos}profesores`, profesor);
    }

    deleteProfesores(profesores: ProfesorDTO[]): ProfesorDTO[] {
        for (let profesor of profesores) {
            this.loadingService.ejecutarLoading("Eliminando profesores...");
            if (profesor.cursos && profesor.cursos.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Profesor con cursos', detail: `El profesor ${profesor.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
                profesores = profesores.filter(profe => profe.id !== profesor.id);
                this.loadingService.finalizarLoading();
            } else {
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                    body: profesor
                };

                this.http.delete<any>(`${environment.microproxy_cursos}profesores`, httpOptions).subscribe({
                    next: async (data) => {
                        console.log('Solicitud DELETE exitosa', data);
                        this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Profesor ${profesor.nombre} eliminado`, life: 3000 });
                        this.loadingService.finalizarLoading();
                    },
                    error: (error) => {
                        console.log('Solicitud DELETE error', error);
                        profesores = profesores.filter(profe => profe.id !== profesor.id);
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        this.loadingService.finalizarLoading();
                    }
                })
            }
        }

        return profesores;
    }

    deleteProfesor(profesor: ProfesorDTO) {
        this.loadingService.ejecutarLoading("Eliminando profesor...");
        if (profesor.cursos && profesor.cursos.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Profesor con cursos', detail: `El profesor ${profesor.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
            this.loadingService.finalizarLoading();
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: profesor
            };

            this.http.delete<any>(`${environment.microproxy_cursos}profesores`, httpOptions).subscribe({
                next: async (data) => {
                    console.log('Solicitud DELETE exitosa', data);
                    this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Profesor ${profesor.nombre} eliminado`, life: 3000 });
                    this.loadingService.finalizarLoading();
                },
                error: (error) => {
                    console.log('Solicitud DELETE error', error);
                    this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                    this.loadingService.finalizarLoading();
                }
            })
        }
    }
}
