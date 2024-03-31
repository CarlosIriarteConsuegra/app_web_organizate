import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoDTO } from '../../models/cursos/curso.dto';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable()
export class CursosService extends BaseService {

    constructor(http: HttpClient, messageService: MessageService, configUrlService: ConfigUrlService, loadingService: LoadingService) { 
        super(http, configUrlService, messageService, loadingService);
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
            this.loadingService.ejecutarLoading("Eliminando cursos...");
            if (curso.rutas && curso.rutas.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Curso en rutas', detail: `El curso ${curso.nombre} pertenece a rutas de aprendizaje`, life: 3000 });
                cursos = cursos.filter(course => course.id != curso.id);
                this.loadingService.finalizarLoading();
            } else {
                this.delete(curso, `${environment.microproxy_cursos}cursos`, "Eliminando curso...", `Curso ${curso.nombre} eliminado`);
            }
        }

        return cursos;
    }

    deleteCurso(curso: CursoDTO) {
        this.loadingService.ejecutarLoading("Eliminando curso...");
        if (curso.rutas && curso.rutas.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Curso en rutas', detail: `El curso ${curso.nombre} pertenece a rutas de aprendizaje`, life: 3000 });
            this.loadingService.finalizarLoading();
        } else {
            this.delete(curso, `${environment.microproxy_cursos}cursos`, "Eliminando curso...", `Curso ${curso.nombre} eliminado`);
        }
    }
}