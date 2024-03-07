import { CursoModel } from "./curso.model";
import { Nullable } from "primeng/ts-helpers";

export class PlataformaModel {
    id?:number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    logo?: string;
    link?: string;
    createdAt?: Date | Nullable;
    updateAt?: Date | Nullable;
    deletedAt?: Date | Nullable;
    cursosPlataforma?: CursoModel[] = [];
}