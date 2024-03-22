// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public show: boolean = false;
  public message: string = '';

  ejecutarLoading(mensaje: string) {
    this.show = true;
    this.message = mensaje;
  }

  finalizarLoading() {
    this.show = false;
    this.message = '';
  }
}