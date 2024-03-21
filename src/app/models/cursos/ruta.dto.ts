import { CursoDTO } from "./curso.dto";

export class RutaDTO {
    id?: number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
    cursos?: CursoDTO[];
}