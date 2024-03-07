import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './components/app-topbar/app-topbar.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { CommonModule } from '@angular/common';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { AppMenuitemComponent } from './components/app-menu/app-menuitem.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ConfigUrlModule, ConfigUrlService } from '../core/configUrl-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, AppTopBarComponent, AppSidebarComponent, AppMenuComponent, AppMenuitemComponent, NotfoundComponent, AppFooterComponent, InicioComponent],
    imports: [BrowserModule, BrowserAnimationsModule, CommonModule, AppRoutingModule, HttpClientModule],
    providers: [ 
        ConfigUrlService, 
        ConfigUrlModule.init()
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }