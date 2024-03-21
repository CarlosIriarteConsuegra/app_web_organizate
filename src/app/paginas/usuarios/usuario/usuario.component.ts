import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { UsuariosDTO } from '../../../models/seguridad/usuarios.dto';
import { UsuarioService } from '../../../services/seguridad/usuario.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { TokenService } from '../../../services/seguridad/token.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  usuarios: UsuariosDTO[] = [];
  usuariosEdit: UsuariosDTO[] = [];
  usuario: UsuariosDTO = {};
  selectedUsuarios: UsuariosDTO[] = [];
  usuarioDialog: boolean = false;
  deleteUsuarioDialog: boolean = false;
  deleteUsuariosDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(
      private usuarioService: UsuarioService,
      private messageService: MessageService,
      public datePipe: DatePipe, 
      public tokenService: TokenService) { }

  ngOnInit() {
      this.usuarioService.getUsuarios().subscribe({
          next: async (data) => {
              if(data.length > 0){
                  this.usuarios = data;
                  for (let usuario of this.usuarios) {
                    usuario.pass = undefined;
                  }
              }else{
                  this.messageService.add({ severity: 'warn', summary: 'Sin información', detail: "No tienes usuarios registrados", life: 3000 });
              }
          },
          error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.statusText, life: 3000 });
          }
      })

      this.cols = [
          { field: 'usuario', header: 'Usuario' }
      ];
  }

  openNew() {
      this.usuario = {};
      this.submitted = false;
      this.usuarioDialog = true;
  }

  deleteSelectedUsuarios() {
      this.deleteUsuariosDialog = true;
  }

  editUsuario(usuario: UsuariosDTO) {
      this.usuario = { ...usuario };
      this.usuarioDialog = true;
  }

  deleteUsuario(usuario: UsuariosDTO) {
      this.deleteUsuarioDialog = true;
      this.usuario = { ...usuario };
      this.selectedUsuarios.push(this.usuario);
  }

  async confirmDeleteSelected() {
      this.deleteUsuariosDialog = false;
      this.selectedUsuarios = this.usuarioService.eliminarUsuarios(this.selectedUsuarios);
      this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
      this.selectedUsuarios = [];
  }

  confirmDelete() {
      this.deleteUsuarioDialog = false;
      this.usuarioService.deleteEliminarUsuario(this.usuario);
      this.usuarios = this.usuarios.filter(val => val.id !== this.usuario.id);
      this.usuario = {};
  }

  hideDialog() {
      this.usuarioDialog = false;
      this.submitted = false;
  }

  saveUsuarios() {
      this.submitted = true;
      this.usuariosEdit = this.usuarios;

      if (this.usuario.codigo?.trim() && this.usuario.nombre?.trim()) {
          if (this.usuario.id) {
            console.log(this.usuario.pass)
              this.usuarioService.putActualizarUsuario(this.usuario).subscribe({
                  next: async (data) => {
                      this.usuariosEdit[this.findIndexById(this.usuario.codigo)] = await this.usuario;
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Actualizado', life: 3000 });
                  },
                  error: (error) => {
                    if (typeof error.error.statusMessage.statusMessage == "string") {
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.error.statusMessage.statusMessage, life: 3000 });
                      } else {
                        for (let mensaje of error.error.statusMessage.message) {
                          this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                        }
                      }
                  }
              })
          } else {
            this.usuario.rol= {id: 0};
              this.usuarioService.postRegistrarUsuario(this.usuario).subscribe({
                  next: async (data) => {
                      this.usuariosEdit.push(data);
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Creado', life: 3000 });
                  },
                  error: (error) => {
                    if (typeof error.error.statusMessage.statusMessage == "string") {
                        this.messageService.add({ severity: 'error', summary: 'Atención', detail: error.error.statusMessage.statusMessage, life: 3000 });
                      } else {
                        for (let mensaje of error.error.statusMessage.message) {
                          this.messageService.add({ severity: 'error', summary: 'Atención', detail: mensaje, life: 3000 });
                        }
                      }
                  }
              })
          }
          this.usuarioDialog = false;
      }
  }

  findIndexById(codigo: string | undefined): number {
      let index = -1;
      for (let i = 0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].codigo === codigo) {
              index = i;
              break;
          }
      }
      return index;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
