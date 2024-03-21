import { AreaCursoDTO } from "./area_curso.dto";
import { PlataformaDTO } from "./plataforma.dto";
import { ProfesorDTO } from "./profesor.dto";
import { RutaDTO } from "./ruta.dto";

export class CursoDTO {
    id?: number;
    codigo?: string;
    nombre?: string;
    descripcion?: string;
    nivel?: number;
    linkCurso?: string;
    linkCursoTeleg?: string;
    idioma?: string;
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
    plataforma?: PlataformaDTO;
    areascurso?: AreaCursoDTO[];
    rutas?: RutaDTO[];
    profesores?: ProfesorDTO[];
}