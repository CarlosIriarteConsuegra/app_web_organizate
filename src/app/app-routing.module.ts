import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                children: [
                    { path: '', component: InicioComponent },
                    { path: 'cursos-online', loadChildren: () => import('./paginas/cursos-online/cursos-online.module').then(m => m.CursosOnlineModule) },
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
