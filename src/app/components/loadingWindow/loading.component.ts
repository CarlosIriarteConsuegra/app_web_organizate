import { Component, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingSpinnerComponent {
  show: boolean = false;
  constructor(public loadingService: LoadingService){
  }
}
