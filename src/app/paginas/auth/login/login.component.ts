import { Component } from '@angular/core';
import { AuthService } from '../../../services/seguridad/auth.service';
import { TokenService } from '../../../services/seguridad/token.service';
import { UsuariosDTO } from '../../../models/seguridad/usuarios.dto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LayoutService } from '../../../services/app-layout.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public usuario?: UsuariosDTO;
  public usuarioLogin: UsuariosDTO = new UsuariosDTO();
  constructor(
    private authService: AuthService,
    private tokenService: TokenService, 
    private messageService: MessageService,
    private router: Router,
    public layoutService: LayoutService) { }

  async login() {
    this.authService.postLogin(this.usuarioLogin).subscribe({
      next: async (data) => {
        this.tokenService.setToken(await data.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error)
        if (typeof error.error.statusMessage.statusMessage == "string") {
          this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.error.statusMessage.statusMessage, life: 3000 });
        } else {
          for (let mensaje of error.error.statusMessage.message) {
            this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
          }
        }
      }
    });
  }
}
