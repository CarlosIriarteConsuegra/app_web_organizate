import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './components/app-topbar/app-topbar.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { AppMenuitemComponent } from './components/app-menu/app-menuitem.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ConfigUrlModule, ConfigUrlService } from '../core/configUrl-service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './paginas/auth/login/login.component';
import { AuthService } from './services/seguridad/auth.service';
import { TokenService } from './services/seguridad/token.service';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from './components/layout/layout.component';
import { interceptorProvider } from './interceptors/token.interceptor';
import { LoadingSpinnerComponent } from './components/loadingWindow/loading.component';

@NgModule({
    declarations: [AppComponent, LayoutComponent, AppTopBarComponent, AppSidebarComponent,
        AppMenuComponent, AppMenuitemComponent, NotfoundComponent, AppFooterComponent, InicioComponent,
        LoginComponent, LoadingSpinnerComponent],
    imports: [BrowserModule, BrowserAnimationsModule, CommonModule, AppRoutingModule, HttpClientModule,
        CheckboxModule, ToastModule, FormsModule,
        ReactiveFormsModule, InputTextModule, ButtonModule,],
    providers: [
        ConfigUrlService,
        ConfigUrlModule.init(),
        AuthService,
        TokenService,
        MessageService,
        interceptorProvider
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }