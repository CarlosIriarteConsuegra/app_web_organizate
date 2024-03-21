import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() {
  }

  setToken(token: string): void{
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }

  deslogger() : void {
    localStorage.clear();
  }

  isAdmin() {
    if(!this.isLogged()){
      return null;
    }

    const token = this.getToken();
    const payload = token? token.split('.')[1] : "";
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rol = valuesJson.rol;
    if(rol == "ROLADM"){
      return true;
    }else{
      return false;
    }
  }
}
