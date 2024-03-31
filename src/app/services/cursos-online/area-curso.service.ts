import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import { MessageService } from 'primeng/api';
import { AreaCursoDTO } from '../../models/cursos/area_curso.dto';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { BaseService } from '../base.service';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable()
export class AreaCursoService extends BaseService {

    constructor(http: HttpClient,
        messageService: MessageService,
        configUrlService: ConfigUrlService,
        loadingService: LoadingService) { 
            super(http, configUrlService, messageService, loadingService);
    }

    getAreasCursos() {
        return this.http.get<AreaCursoDTO[]>(`${environment.microproxy_cursos}area-curso`);
    }

    postAreaCursos(areaCursos: AreaCursoDTO) {
        return this.http.post<AreaCursoDTO>(`${environment.microproxy_cursos}area-curso`, areaCursos);
    }

    putAreaCursos(areaCursos: AreaCursoDTO) {
        return this.http.put<AreaCursoDTO>(`${environment.microproxy_cursos}area-curso`, areaCursos);
    }

    deleteAreasCursos(areasCursos: AreaCursoDTO[]): AreaCursoDTO[] {
        for (let areaCursos of areasCursos) {
            this.loadingService.ejecutarLoading("Eliminando areas de cursos");
            if (areaCursos.cursos && areaCursos.cursos.length > 0) {
                this.messageService.add({ severity: 'error', summary: 'Area de cursos con cursos', detail: `El area de cursos ${areaCursos.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
                areasCursos = areasCursos.filter(area_curso => area_curso.id !== areaCursos.id);
                this.loadingService.finalizarLoading();
            } else {
                this.delete(areaCursos, `${environment.microproxy_cursos}area-curso`, "Eliminando area de cursos...", `Area de cursos ${areaCursos.nombre} eliminada`);
            }
        }

        return areasCursos;
    }

    deleteAreaCursos(areaCursos: AreaCursoDTO) {
        this.loadingService.ejecutarLoading("Eliminando area de cursos");
        if (areaCursos.cursos && areaCursos.cursos.length > 0) {
            this.messageService.add({ severity: 'error', summary: 'Area de cursos con cursos', detail: `El area de cursos ${areaCursos.nombre} tiene cursos asginados, por lo cual no se puede eliminar`, life: 3000 });
            this.loadingService.finalizarLoading();
        } else {
            this.delete(areaCursos, `${environment.microproxy_cursos}area-curso`, "Eliminando area de cursos...", `Area de cursos ${areaCursos.nombre} eliminada`);
        }
    }
}
