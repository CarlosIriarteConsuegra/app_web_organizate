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

    constructor(http: HttpClient, messageService: MessageService, configUrlService: ConfigUrlService, loadingService: LoadingService) { 
        super(http, configUrlService, messageService, loadingService);
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
                this.delete(plataform, `${environment.microproxy_cursos}plataformas`, "Eliminando plataformas...", `Plataforma ${plataform.nombre} eliminada`);
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
            this.delete(plataform, `${environment.microproxy_cursos}plataformas`, "Eliminando plataforma...", `Plataforma ${plataform.nombre} eliminada`);
        }
    }
}
