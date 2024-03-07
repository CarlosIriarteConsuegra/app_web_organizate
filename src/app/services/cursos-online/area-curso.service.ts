import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { AreaCursoModel } from '../../models/cursos/area_curso.model';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';

@Injectable()
export class AreaCursoService extends BaseService{

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) { 
        super(http, configUrlService);
    }

    getAreasCursos() {
        return this.http.get<AreaCursoModel[]>(`${environment.microproxy_cursos}area-curso`);
    }

    postAreaCursos(areaCursos: AreaCursoModel) {
        return this.http.post<AreaCursoModel>(`${environment.microproxy_cursos}area-curso`, areaCursos);
    }

    putAreaCursos(areaCursos: AreaCursoModel) {
        return this.http.put<AreaCursoModel>(`${environment.microproxy_cursos}area-curso`, areaCursos);
    }

    deleteAreasCursos(areasCursos: AreaCursoModel[]): AreaCursoModel[] {
        for (let areaCursos of areasCursos) {
            if (areaCursos.cursos && areaCursos.cursos.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Area de cursos con cursos', detail: `El area de cursos ${areaCursos.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
                areasCursos = areasCursos.filter(area_curso => area_curso.id !== areaCursos.id);
            } else {
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                    body: areaCursos
                };

                this.http.delete<any>(`${environment.microproxy_cursos}area-curso`, httpOptions).subscribe({
                    next: async (data) => {
                        console.log('Solicitud DELETE exitosa', data);
                        this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Area de cursos ${areaCursos.nombre} eliminada`, life: 3000 });
                    },
                    error: (error) => {
                        console.log('Solicitud DELETE error', error);
                        areasCursos = areasCursos.filter(area_curso => area_curso.id !== areaCursos.id);
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                    }
                })
            }
        }

        return areasCursos;
    }

    deleteAreaCursos(areaCursos: AreaCursoModel) {
        if (areaCursos.cursos && areaCursos.cursos.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Area de cursos con cursos', detail: `El area de cursos ${areaCursos.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: areaCursos
            };

            this.http.delete<any>(`${environment.microproxy_cursos}area-curso`, httpOptions).subscribe({
                next: async (data) => {
                    console.log('Solicitud DELETE exitosa', data);
                    this.messageService.add({ severity: 'success', summary: 'Eliminada', detail: `Area de cursos ${areaCursos.nombre} eliminada`, life: 3000 });
                },
                error: (error) => {
                    console.log('Solicitud DELETE error', error);
                    this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                }
            })
        }
    }
}
