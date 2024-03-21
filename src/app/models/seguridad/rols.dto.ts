import { UsuariosDTO } from "./usuarios.dto";

export class RolsDTO {
  id?: number;
  codigo?: string;
  nombre?: string;
  default?: number = 0;
  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
  usuarios?: UsuariosDTO[]

}