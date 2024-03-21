import { CursoDTO } from "./curso.dto";

export class AreaCursoDTO {
    id?: number;
    codigo?: string;
    nombre?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
    cursos?: CursoDTO[];
}