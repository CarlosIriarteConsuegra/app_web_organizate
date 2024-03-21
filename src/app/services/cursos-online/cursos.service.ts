import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoDTO } from '../../models/cursos/curso.dto';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';

@Injectable()
export class CursosService extends BaseService {

    constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) { 
        super(http, configUrlService);
    }

    getCursos() {
        return this.http.get<CursoDTO[]>(`${environment.microproxy_cursos}cursos`);
    }

    postCurso(curso: CursoDTO) {
        return this.http.post<CursoDTO>(`${environment.microproxy_cursos}cursos`, curso);
    }

    putCurso(curso: CursoDTO) {
        return this.http.put<CursoDTO>(`${environment.microproxy_cursos}cursos`, curso);
    }

    deleteCursos(cursos: CursoDTO[]) {
        for (let curso of cursos) {
            if (curso.rutas && curso.rutas.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Curso en rutas', detail: `El curso ${curso.nombre} pertenece a rutas de aprendizaje`, life: 3000 });
                cursos = cursos.filter(course => course.id != curso.id);
            } else {
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                    body: curso
                };

                this.http.delete<any>(`${environment.microproxy_cursos}cursos`, httpOptions).subscribe({
                    next: async (data) => {
                        console.log('Solicitud DELETE exitosa', data);
                        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Curso ${curso.nombre} eliminado`, life: 3000 });
                    },
                    error: (error) => {
                        console.log('Solicitud DELETE error', error);
                        cursos = cursos.filter(course => course.id != curso.id);
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                    }
                })
            }
        }

        return cursos;
    }

    deleteCurso(curso: CursoDTO) {
        if (curso.rutas && curso.rutas.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Curso en rutas', detail: `El curso ${curso.nombre} pertenece a rutas de aprendizaje`, life: 3000 });
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                body: curso
            };

            this.http.delete<any>(`${environment.microproxy_cursos}cursos`, httpOptions).subscribe({
                next: async (data) => {
                    console.log('Solicitud DELETE exitosa', data);
                    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: `Curso ${curso.nombre} eliminado`, life: 3000 });
                },
                error: (error) => {
                    console.log('Solicitud DELETE error', error);
                    this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                }
            })
        }
    }
}