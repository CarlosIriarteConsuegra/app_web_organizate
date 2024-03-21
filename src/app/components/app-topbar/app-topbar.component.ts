import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/app-layout.service';
import { TokenService } from '../../services/seguridad/token.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-topbar',
    templateUrl: './app-topbar.component.html',
    styleUrl: './app-topbar.component.scss'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private tokenService: TokenService, private router: Router) { }

    cerrarSesion() {
        this.tokenService.deslogger();
        this.router.navigate(['/auth/login']);
    }
}