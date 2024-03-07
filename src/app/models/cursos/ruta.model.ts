import { CursoModel } from "./curso.model";

export class RutaModel {
    id?: number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
    cursos?: CursoModel[];
}