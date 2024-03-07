import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlataformasComponent } from './plataformas/plataformas.component';
import { CursosComponent } from './cursos/cursos.component';
import { RutasComponent } from './rutas/rutas.component';
import { AreasCursosComponent } from './areas-cursos/areas-cursos.component';
import { ProfesoresComponent } from './profesores/profesores.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'cursos', component: CursosComponent },
        { path: 'rutas', component: RutasComponent },
        { path: 'areascursos', component: AreasCursosComponent },
        { path: 'profesores', component: ProfesoresComponent },
        { path: 'plataformas', component: PlataformasComponent },
    ])],
    exports: [RouterModule]
})
export class CursosOnlineRoutingModule { }