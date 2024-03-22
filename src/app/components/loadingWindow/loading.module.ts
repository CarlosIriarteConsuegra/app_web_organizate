import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LoadingSpinnerComponent } from './loading.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';



@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    NgFor,
    NgbAlertModule,
  ],
  bootstrap: [LoadingSpinnerComponent]
})
export class LoadingModule { }
