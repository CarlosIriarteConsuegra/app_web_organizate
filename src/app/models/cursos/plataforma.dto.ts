import { CursoDTO } from "./curso.dto";
import { Nullable } from "primeng/ts-helpers";

export class PlataformaDTO {
    id?:number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    logo?: string;
    link?: string;
    createdAt?: Date | Nullable;
    updateAt?: Date | Nullable;
    deletedAt?: Date | Nullable;
    cursosPlataforma?: CursoDTO[] = [];
}