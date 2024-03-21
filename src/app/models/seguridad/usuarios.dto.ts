import { RolsDTO } from "./rols.dto";

export class UsuariosDTO {
  id?: number;
  codigo?: string;
  nombre?: string;
  email?: string;
  pass?: string;
  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
  rol?: RolsDTO;
}