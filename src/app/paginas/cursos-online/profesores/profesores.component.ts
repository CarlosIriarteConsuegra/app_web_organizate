import { Component } from '@angular/core';
import { ProfesorDTO } from '../../../models/cursos/profesor.dto';
import { ProfesoresService } from '../../../services/cursos-online/profesores.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/seguridad/token.service';
import { LoadingService } from '../../../components/loadingWindow/loading.service';

@Component({
    selector: 'app-profesores',
    templateUrl: './profesores.component.html',
    styleUrl: './profesores.component.scss'
})
export class ProfesoresComponent {
    profesores: ProfesorDTO[] = [];
    profesoresEdit: ProfesorDTO[] = [];
    profesor: ProfesorDTO = {};
    selectedProfesores: ProfesorDTO[] = [];
    profesorDialog: boolean = false;
    deleteProfesorDialog: boolean = false;
    deleteProfesoresDialog: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private profesoresService: ProfesoresService,
        private messageService: MessageService,
        public datePipe: DatePipe, 
        public tokenService: TokenService,
        private loadingService: LoadingService) { }

    ngOnInit() {
        this.loadingService.ejecutarLoading("Cargando profesores...");
        this.profesoresService.getProfesores().subscribe({
            next: async (data) => {
                if(data.length > 0){
                    this.profesores = data;
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes profesores registrados", life: 3000 });
                }
                this.loadingService.finalizarLoading();
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                this.loadingService.finalizarLoading();
            }
        })

        this.cols = [
            { field: 'profesor', header: 'Profesor' }
        ];
    }

    openNew() {
        this.profesor = {};
        this.submitted = false;
        this.profesorDialog = true;
    }

    deleteSelectedProfesores() {
        this.deleteProfesoresDialog = true;
    }

    editProfesor(profesor: ProfesorDTO) {
        this.profesor = { ...profesor };
        this.profesorDialog = true;
    }

    deleteProfesor(profesor: ProfesorDTO) {
        this.deleteProfesorDialog = true;
        this.profesor = { ...profesor };
        this.selectedProfesores.push(this.profesor);
    }

    async confirmDeleteSelected() {
        this.deleteProfesoresDialog = false;
        this.selectedProfesores = this.profesoresService.deleteProfesores(this.selectedProfesores);
        this.profesores = this.profesores.filter(val => !this.selectedProfesores.includes(val));
        this.selectedProfesores = [];
    }

    confirmDelete() {
        this.deleteProfesorDialog = false;
        this.profesoresService.deleteProfesor(this.profesor);
        this.profesores = this.profesores.filter(val => val.id !== this.profesor.id);
        this.profesor = {};
    }

    hideDialog() {
        this.profesorDialog = false;
        this.submitted = false;
    }

    saveAreaCursos() {
        this.submitted = true;
        this.profesoresEdit = this.profesores;

        if (this.profesor.codigo?.trim() && this.profesor.nombre?.trim()) {
            if (this.profesor.id) {
                this.loadingService.ejecutarLoading("Actualizando profesor...");
                this.profesoresService.putProfesor(this.profesor).subscribe({
                    next: async (data) => {
                        this.profesoresEdit[this.findIndexById(this.profesor.codigo)] = await this.profesor;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profesor Actualizado', life: 3000 });
                        this.loadingService.finalizarLoading();
                    },
                    error: (error) => {
                        if(typeof error.error.statusMessage == "string"){
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        }else{
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                        this.loadingService.finalizarLoading();
                    }
                })
            } else {
                this.loadingService.ejecutarLoading("Guardando profesor...");
                this.profesoresService.postProfesor(this.profesor).subscribe({
                    next: async (data) => {
                        data.cursos = [];
                        this.profesoresEdit.push(data);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profesor Creado', life: 3000 });
                        this.loadingService.finalizarLoading();
                    },
                    error: (error) => {
                        if(typeof error.error.statusMessage == "string"){
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        }else{
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                        this.loadingService.finalizarLoading();
                    }
                })
            }
            this.profesorDialog = false;
        }
    }

    findIndexById(codigo: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.profesores.length; i++) {
            if (this.profesores[i].codigo === codigo) {
                index = i;
                break;
            }
        }
        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
