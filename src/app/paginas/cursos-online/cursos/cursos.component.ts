import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CursoDTO } from '../../../models/cursos/curso.dto';
import { CursosService } from '../../../services/cursos-online/cursos.service';
import { PlataformaDTO } from '../../../models/cursos/plataforma.dto';
import { PlataformasService } from '../../../services/cursos-online/plataformas.service';
import { AreaCursoService } from '../../../services/cursos-online/area-curso.service';
import { ProfesoresService } from '../../../services/cursos-online/profesores.service';
import { AreaCursoDTO } from '../../../models/cursos/area_curso.dto';
import { ProfesorDTO } from '../../../models/cursos/profesor.dto';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/seguridad/token.service';
import { LoadingService } from '../../../components/loadingWindow/loading.service';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrl: './cursos.component.scss'
})
export class CursosComponent {
    cursos: CursoDTO[] = [];
    cursosEdit: CursoDTO[] = [];
    curso: CursoDTO = {};
    selectedCursos: CursoDTO[] = [];
    cursoDialog: boolean = false;
    deleteCursoDialog: boolean = false;
    deleteCursosDialog: boolean = false;
    submitted: boolean = false;
    cols!: any[];
    rowsPerPageOptions = [5, 10, 20];
    plataformas: any[] = [];
    selectdPlataforma: any;
    areasCursos: any[] = [];
    selectdAreasCursos: AreaCursoDTO[] | undefined = [];
    profesores: ProfesorDTO[] = [];
    selectedProfesores: ProfesorDTO[] = [];
    cursosCargados: boolean = false;
    plataformasCargadas: boolean = false;
    areasCursosCargadas: boolean = false;
    profesoresCargados: boolean = false;

    nivelesCursos: any[] = [
        {
            descripcion: "Principiante",
            valor: 1
        },
        {
            descripcion: "Intermedio",
            valor: 2
        },
        {
            descripcion: "Avanzado",
            valor: 3
        },
        {
            descripcion: "Profesional",
            valor: 4
        },
        {
            descripcion: "Indefinido",
            valor: 0
        }
    ]

    constructor(
        private cursosService: CursosService,
        private plataformasService: PlataformasService,
        private areaCursosService: AreaCursoService,
        private profesoresService: ProfesoresService,
        private messageService: MessageService,
        public datePipe: DatePipe,
        public tokenService: TokenService,
        private loadingService: LoadingService) {

    }

    ngOnInit() {

        this.loadingService.ejecutarLoading("Cargando cursos...");

        this.consultarCursos();
        this.consultarPlataformas();
        this.consultarProfesores();
        this.consultarAreasCursos();


        this.cols = [
            { field: 'curso', header: 'Curso' },
        ];
    }

    finLoadingInicial() {
        if (this.cursosCargados && this.plataformasCargadas && this.areasCursosCargadas && this.profesoresCargados) {
            this.loadingService.finalizarLoading();
        }
    }

    consultarCursos() {
        this.cursosService.getCursos().subscribe({
            next: async (data) => {
                if (data && data.length > 0) {
                    this.cursos = data;
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes cursos registrados", life: 3000 });
                }
                this.cursosCargados = true;
                this.finLoadingInicial();
            },
            error: async (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                this.cursosCargados = true;
                this.finLoadingInicial();
            }
        })
    }

    consultarPlataformas() {
        this.plataformasService.getPlataforms().subscribe({
            next: async (data) => {
                if (data && data.length > 0) {
                    this.plataformas = data;
                    this.plataformas.forEach(objeto => {
                        delete objeto.cursos;
                    });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes plataformas registradas", life: 3000 });
                }
                this.plataformasCargadas = true;
                this.finLoadingInicial();
            },
            error: async (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                this.plataformasCargadas = true;
                this.finLoadingInicial();
            }
        });
    }

    consultarAreasCursos() {
        this.areaCursosService.getAreasCursos().subscribe({
            next: async (data) => {
                if (data && data.length > 0) {
                    this.areasCursos = data;
                    this.areasCursos.forEach(objeto => {
                        delete objeto.cursos;
                    });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes areas de cursos registradas", life: 3000 });
                }
                this.areasCursosCargadas = true;
                this.finLoadingInicial();
            },
            error: async (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                this.areasCursosCargadas = true;
                this.finLoadingInicial();
            }
        });
    }

    consultarProfesores() {
        this.profesoresService.getProfesores().subscribe({
            next: async (data) => {
                if (data && data.length > 0) {
                    this.profesores = data;
                    this.profesores.forEach(objeto => {
                        delete objeto.cursos;
                    });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes profesores registrados", life: 3000 });
                }
                this.profesoresCargados = true;
                this.finLoadingInicial();
            },
            error: async (error) => {
                this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                this.profesoresCargados = true;
                this.finLoadingInicial();
            }
        });
    }

    getNivel(nivel: number): string {
        switch (nivel) {
            case 1:
                return 'Principiante';
            case 2:
                return 'Intermedio';
            case 3:
                return 'Avanzado';
            case 4:
                return 'Profesional';
            default:
                return "Indefinido";
        }
    }

    openNew() {
        this.selectdPlataforma = {};
        this.selectdAreasCursos = [];
        this.selectedProfesores = [];
        this.curso = {};
        this.submitted = false;
        this.cursoDialog = true;
    }

    deleteSelectedCursos() {
        this.deleteCursosDialog = true;
    }

    editCurso(curso: CursoDTO) {
        this.curso = { ...curso };
        this.selectdPlataforma = this.curso.plataforma ? this.curso.plataforma.id : {};
        this.selectdAreasCursos = this.curso.areascurso ? this.curso.areascurso : [];
        this.selectedProfesores = this.curso.profesores ? this.curso.profesores : [];

        this.cursoDialog = true;
    }

    deleteCurso(curso: CursoDTO) {
        this.deleteCursoDialog = true;
        this.curso = { ...curso };
        this.selectedCursos.push(this.curso);
    }

    async confirmDeleteSelected() {
        this.deleteCursosDialog = false;
        this.selectedCursos = this.cursosService.deleteCursos(this.selectedCursos);
        this.cursos = this.cursos.filter(val => !this.selectedCursos.includes(val));
        this.selectedCursos = [];
    }

    confirmDelete() {
        this.deleteCursoDialog = false;
        this.cursosService.deleteCurso(this.curso);
        this.cursos = this.cursos.filter(val => val.id !== this.curso.id);
        this.curso = {};
    }

    hideDialog() {
        this.cursoDialog = false;
        this.submitted = false;
    }

    saveCurso() {
        this.submitted = true;
        this.cursosEdit = this.cursos;
        this.curso.plataforma = this.plataformas.filter(plataforma => plataforma.id >= this.selectdPlataforma)[0];
        this.curso.areascurso = this.selectdAreasCursos;
        this.curso.profesores = this.selectedProfesores;
        if (this.curso.codigo?.trim() && this.curso.nombre?.trim() && this.curso.descripcion?.trim() && this.curso.nivel != null && this.curso.idioma?.trim()) {
            if (this.curso.id) {
                this.loadingService.ejecutarLoading("Actualizando curso...");
                this.cursosService.putCurso(this.curso).subscribe({
                    next: async (data) => {
                        this.cursos[this.findIndexById(this.curso.codigo)] = data;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curso Actualizado', life: 3000 });
                        this.loadingService.finalizarLoading();
                    },
                    error: (error) => {
                        if (typeof error.error.statusMessage == "string") {
                            this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
                        } else {
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                            }
                        }
                        this.loadingService.finalizarLoading();
                    }
                })
            } else {
                this.loadingService.ejecutarLoading("Guardando curso...");
                this.cursosService.postCurso(this.curso).subscribe({
                    next: async (data) => {
                        data.rutas = [];
                        this.cursosEdit.unshift(data);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curso Creado', life: 3000 });
                        this.loadingService.finalizarLoading();
                    },
                    error: (error) => {
                        if (typeof error.error.statusMessage == "string") {
                            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: error.statusText, life: 3000 });
                        } else {
                            for (let mensaje of error.error.statusMessage.message) {
                                this.messageService.add({ severity: 'error', summary: 'ERROR', detail: mensaje, life: 3000 });
                            }
                        }
                        this.loadingService.finalizarLoading();
                    }
                })
            }
            this.cursoDialog = false;
        } else {
            this.messageService.add({ severity: 'error', summary: 'Campos sin llenar', detail: "Algunos campos obligatorios no han sido digilenciados", life: 3000 });
        }
    }

    findIndexById(codigo: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.cursos.length; i++) {
            if (this.cursos[i].codigo === codigo) {
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
