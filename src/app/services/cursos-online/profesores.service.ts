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

    constructor(http: HttpClient, messageService: MessageService, configUrlService: ConfigUrlService,
        loadingService: LoadingService) { 
            super(http, configUrlService, messageService, loadingService);
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
                this.delete(profesor, `${environment.microproxy_cursos}profesores`, "Eliminando profesores...", `Profesor ${profesor.nombre} eliminado`);
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
            this.delete(profesor, `${environment.microproxy_cursos}profesores`, "Eliminando profesor...", `Profesor ${profesor.nombre} eliminado`);
        }
    }
}
