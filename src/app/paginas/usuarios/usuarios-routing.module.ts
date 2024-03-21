import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'usuarios', component: UsuarioComponent },
    ])],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }