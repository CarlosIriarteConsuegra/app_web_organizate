import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuardian } from './guardians/auth.guardian';
import { SessionGuardian } from './guardians/session.guardian';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LayoutComponent,
                children: [
                    { path: '', component: InicioComponent, canActivate: [AuthGuardian] },
                    { path: 'cursos-online', loadChildren: () => import('./paginas/cursos-online/cursos-online.module').then(m => m.CursosOnlineModule), canActivate: [AuthGuardian] },
                ]
            },
            { path: 'auth', loadChildren: () => import('./paginas/auth/auth.module').then(m => m.AuthModule), canActivate: [SessionGuardian] },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
