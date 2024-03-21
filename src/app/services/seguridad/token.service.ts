import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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
}
