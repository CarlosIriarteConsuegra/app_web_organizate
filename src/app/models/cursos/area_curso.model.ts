import { CursoModel } from "./curso.model";

export class AreaCursoModel {
    id?: number;
    codigo?: string;
    nombre?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
    cursos?: CursoModel[];
}