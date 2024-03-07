import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursosOnlineRoutingModule } from './cursos-online-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { AreasCursosComponent } from './areas-cursos/areas-cursos.component';
import { PlataformasComponent } from './plataformas/plataformas.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { RutasComponent } from './rutas/rutas.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { PlataformasService } from '../../services/cursos-online/plataformas.service';
import { HttpClientModule } from '@angular/common/http';
import { AreaCursoService } from '../../services/cursos-online/area-curso.service';
import { ProfesoresService } from '../../services/cursos-online/profesores.service';
import { CursosService } from '../../services/cursos-online/cursos.service';
import { DataViewModule } from 'primeng/dataview';
import { DatePipe } from '@angular/common';
import { RutasService } from '../../services/cursos-online/rutas.service';

@NgModule({
  declarations: [CursosComponent, AreasCursosComponent, PlataformasComponent, ProfesoresComponent, RutasComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    CursosOnlineRoutingModule,
    ButtonModule,
    ChipModule,
    CommonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    OrderListModule,
    MultiSelectModule,
    DataViewModule
  ],
  providers: [PlataformasService, MessageService, AreaCursoService, ProfesoresService, CursosService, DatePipe, RutasService]
})
export class CursosOnlineModule { }
