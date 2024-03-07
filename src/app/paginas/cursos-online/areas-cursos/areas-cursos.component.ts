import { Component } from '@angular/core';
import { AreaCursoService } from '../../../services/cursos-online/area-curso.service';
import { MessageService } from 'primeng/api';
import { AreaCursoModel } from '../../../models/cursos/area_curso.model';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-areas-cursos',
  templateUrl: './areas-cursos.component.html',
  styleUrl: './areas-cursos.component.scss'
})
export class AreasCursosComponent {
    areasCursos: AreaCursoModel[] = [];
    areasCursosEdit: AreaCursoModel[] = [];
    areaCursos: AreaCursoModel = {};
    selectedAreasCursos: AreaCursoModel[] = [];
    areaCursosDialog: boolean = false;
    deleteAreaCursosDialog: boolean = false;
    deleteAreasCursosDialog: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private areaCursosService: AreaCursoService,
        private messageService: MessageService,
        public datePipe: DatePipe) { }

    ngOnInit() {
        this.areaCursosService.getAreasCursos().subscribe({
            next: async (data) => {
                if(data.length > 0){
                    this.areasCursos = data;
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes areas de cursos registradas", life: 3000 });
                }
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
            }
        })

        this.cols = [
            { field: 'areaCurso', header: 'Area de Cursos' },
        ];
    }

    openNew() {
        this.areaCursos = {};
        this.submitted = false;
        this.areaCursosDialog = true;
    }

    deleteSelectedAreasCursos() {
        this.deleteAreasCursosDialog = true;
    }

    editAreaCursos(areaCurso: AreaCursoModel) {
        this.areaCursos = { ...areaCurso };
        this.areaCursosDialog = true;
    }

    deleteAreaCursos(areaCurso: AreaCursoModel) {
        this.deleteAreaCursosDialog = true;
        this.areaCursos = { ...areaCurso };
        this.selectedAreasCursos.push(this.areaCursos);
    }

    async confirmDeleteSelected() {
        this.deleteAreasCursosDialog = false;
        this.selectedAreasCursos = this.areaCursosService.deleteAreasCursos(this.selectedAreasCursos);
        this.areasCursos = this.areasCursos.filter(val => !this.selectedAreasCursos.includes(val));
        this.selectedAreasCursos = [];
    }

    confirmDelete() {
        this.deleteAreaCursosDialog = false;
        this.areaCursosService.deleteAreaCursos(this.areaCursos);
        this.areasCursos = this.areasCursos.filter(val => val.id !== this.areaCursos.id);
        this.areaCursos = {};
    }

    hideDialog() {
        this.areaCursosDialog = false;
        this.submitted = false;
    }

    saveAreaCursos() {
        this.submitted = true;
        this.areasCursosEdit = this.areasCursos;
        if (this.areaCursos.codigo?.trim() && this.areaCursos.nombre?.trim()) {
            if (this.areaCursos.id) {

                this.areaCursosService.putAreaCursos(this.areaCursos).subscribe({
                    next: async (data) => {
                        this.areasCursosEdit[this.findIndexById(this.areaCursos.codigo)] = await this.areaCursos;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Area de cursos Actualizada', life: 3000 });
                    },
                    error: (error) => {
                        if(typeof error.error.statusMessage == "string"){
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        }else{
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                    }
                })
            } else {
                this.areaCursosService.postAreaCursos(this.areaCursos).subscribe({
                    next: async (data) => {
                        data.cursos = [];
                        this.areasCursosEdit.push(data);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Area de cursos Creada', life: 3000 });
                    },
                    error: (error) => {
                        if(typeof error.error.statusMessage == "string"){
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        }else{
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                    }
                })
            }
            this.areaCursosDialog = false;
        }
    }

    findIndexById(codigo: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.areasCursos.length; i++) {
            if (this.areasCursos[i].codigo === codigo) {
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
