import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { RutaDTO } from '../../../models/cursos/ruta.dto';
import { RutasService } from '../../../services/cursos-online/rutas.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CursoDTO } from '../../../models/cursos/curso.dto';
import { CursosService } from '../../../services/cursos-online/cursos.service';
import { TokenService } from '../../../services/seguridad/token.service';

@Component({
    selector: 'app-rutas',
    templateUrl: './rutas.component.html',
    styleUrl: './rutas.component.scss'
})
export class RutasComponent {
    rutas: RutaDTO[] = [];
    rutasEdit: RutaDTO[] = [];
    ruta: RutaDTO = {};
    selectedRutas: RutaDTO[] = [];
    rutaDialog: boolean = false;
    deleteRutaDialog: boolean = false;
    deleteRutasDialog: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    cursos: CursoDTO[] = [];
    selectedCursos: CursoDTO[] = [];

    constructor(
        private rutasService: RutasService,
        private messageService: MessageService,
        public datePipe: DatePipe,
        private cursosService: CursosService, 
        public tokenService: TokenService) { }

    ngOnInit() {
        this.rutasService.getRutas().subscribe({
            next: async (data) => {
                if (data.length > 0) {
                    this.rutas = data;
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes rutas registradas", life: 3000 });
                }
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
            }
        })

        this.cursosService.getCursos().subscribe({
            next: async (data) => {
                if (data.length > 0) {
                    this.cursos = data;
                    this.cursos.forEach(objeto => {
                        delete objeto.rutas;
                        delete objeto.areascurso;
                        delete objeto.plataforma;
                        delete objeto.profesores;
                    });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes cursos registradas", life: 3000 });
                }
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
            }
        })

        this.cols = [
            { field: 'codigo', header: 'Codigo' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'creacion', header: 'Creación' },
            { field: 'actualizacion', header: 'Actualización' }
        ];
    }

    openNew() {
        this.ruta = {};
        this.selectedCursos = [];
        this.submitted = false;
        this.rutaDialog = true;
    }

    deleteSelectedRutas() {
        this.deleteRutasDialog = true;
    }

    editRuta(ruta: RutaDTO) {
        this.selectedCursos = ruta.cursos ? ruta.cursos : [];
        this.ruta = { ...ruta };
        this.rutaDialog = true;
    }

    deleteRuta(ruta: RutaDTO) {
        this.deleteRutaDialog = true;
        this.ruta = { ...ruta };
        this.selectedRutas.push(this.ruta);
    }

    async confirmDeleteSelected() {
        this.deleteRutasDialog = false;
        this.selectedRutas = this.rutasService.deleteRutas(this.selectedRutas);
        this.rutas = this.rutas.filter(val => !this.selectedRutas.includes(val));
        this.selectedRutas = [];
    }

    confirmDelete() {
        this.deleteRutaDialog = false;
        this.rutasService.deleteRuta(this.ruta);
        this.rutas = this.rutas.filter(val => val.id !== this.ruta.id);
        this.ruta = {};
    }

    hideDialog() {
        this.rutaDialog = false;
        this.submitted = false;
    }

    saveRuta() {
        this.submitted = true;
        this.rutasEdit = this.rutas;
        this.ruta.cursos = this.selectedCursos;
        console.log(this.ruta);
        if (this.ruta.codigo?.trim() && this.ruta.nombre?.trim() && this.ruta.descripcion?.trim()) {
            if (this.ruta.id) {
                this.rutasService.putRuta(this.ruta).subscribe({
                    next: async (data) => {
                        this.rutasEdit[this.findIndexById(this.ruta.codigo)] = this.ruta;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ruta Actualizada', life: 3000 });
                    },
                    error: (error) => {
                        if (typeof error.error.statusMessage == "string") {
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        } else {
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                    }
                })
            } else {
                this.rutasService.postRuta(this.ruta).subscribe({
                    next: async (data) => {
                        this.rutasEdit.push(data);
                        this.messageService.add({ severity: 'success', summary: 'Exitosa', detail: 'Ruta Creada', life: 3000 });
                    },
                    error: (error) => {
                        if (typeof error.error.statusMessage == "string") {
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        } else {
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                    }
                })
            }
            this.rutaDialog = false;
        }
    }

    findIndexById(codigo: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.rutas.length; i++) {
            if (this.rutas[i].codigo === codigo) {
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
