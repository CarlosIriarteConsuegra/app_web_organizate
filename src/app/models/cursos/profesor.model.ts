import { CursoModel } from "./curso.model";

export class ProfesorModel {
    id?: number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    linkedin?: string;
    youtube?: string;
    facebook?: string;
    x?: string;
    instagram?: string;
    correo?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
    cursos?: CursoModel[];
}