import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PlataformaDTO } from '../../../models/cursos/plataforma.dto';
import { PlataformasService } from '../../../services/cursos-online/plataformas.service';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/seguridad/token.service';

@Component({
    selector: 'app-plataformas',
    templateUrl: './plataformas.component.html',
    styleUrl: './plataformas.component.scss'
})
export class PlataformasComponent {
    plataformas: PlataformaDTO[] = [];
    plataformasEdit: PlataformaDTO[] = [];
    plataforma: PlataformaDTO = {};
    selectedPlataformas: PlataformaDTO[] = [];
    plataformaDialog: boolean = false;
    deletePlataformaDialog: boolean = false;
    deletePlataformasDialog: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private plataformasService: PlataformasService,
        private messageService: MessageService,
        public datePipe: DatePipe, 
        public tokenService: TokenService) { }

    ngOnInit() {
        this.plataformasService.getPlataforms().subscribe({
            next: async (data) => {
                if(data.length > 0){
                    this.plataformas = data;
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes plataformas registradas", life: 3000 });
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
            { field: 'logo', header: 'Logo' },
            { field: 'link', header: 'Link' },
            { field: 'cursos', header: 'Cursos' },
            { field: 'creacion', header: 'Creación' },
            { field: 'actualizacion', header: 'Actualización' }
        ];
    }

    openNew() {
        this.plataforma = {};
        this.submitted = false;
        this.plataformaDialog = true;
    }

    deleteSelectedPlataformas() {
        this.deletePlataformasDialog = true;
    }

    editPlataforma(plataforma: PlataformaDTO) {
        this.plataforma = { ...plataforma };
        this.plataformaDialog = true;
    }

    deletePlataforma(plataforma: PlataformaDTO) {
        this.deletePlataformaDialog = true;
        this.plataforma = { ...plataforma };
        this.selectedPlataformas.push(this.plataforma);
    }

    async confirmDeleteSelected() {
        this.deletePlataformasDialog = false;
        this.selectedPlataformas = this.plataformasService.deletePlataforms(this.selectedPlataformas);
        this.plataformas = this.plataformas.filter(val => !this.selectedPlataformas.includes(val));
        this.selectedPlataformas = [];
    }

    confirmDelete() {
        this.deletePlataformaDialog = false;
        this.plataformasService.deletePlataform(this.plataforma);
        this.plataformas = this.plataformas.filter(val => val.id !== this.plataforma.id);
        this.plataforma = {};
    }

    hideDialog() {
        this.plataformaDialog = false;
        this.submitted = false;
    }

    savePlataform() {
        this.submitted = true;
        this.plataformasEdit = this.plataformas;
        if (this.plataforma.codigo?.trim() && this.plataforma.nombre?.trim() && this.plataforma.descripcion?.trim() && this.plataforma.logo?.trim()) {
            if (this.plataforma.id) {

                this.plataformasService.putPlataform(this.plataforma).subscribe({
                    next: async (data) => {
                        this.plataformasEdit[this.findIndexById(this.plataforma.codigo)] = await this.plataforma;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Plataforma Actualizada', life: 3000 });
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
                this.plataformasService.postPlataform(this.plataforma).subscribe({
                    next: async (data) => {
                        data.cursosPlataforma = [];
                        this.plataformasEdit.push(data);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Plataforma Creada', life: 3000 });
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
            this.plataformaDialog = false;
        }
    }

    findIndexById(codigo: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.plataformas.length; i++) {
            if (this.plataformas[i].codigo === codigo) {
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
