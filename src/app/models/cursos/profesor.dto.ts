import { CursoDTO } from "./curso.dto";

export class ProfesorDTO {
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
    cursos?: CursoDTO[];
}