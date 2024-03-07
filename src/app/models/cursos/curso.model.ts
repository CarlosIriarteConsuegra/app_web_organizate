import { AreaCursoModel } from "./area_curso.model";
import { PlataformaModel } from "./plataforma.model";
import { ProfesorModel } from "./profesor.model";
import { RutaModel } from "./ruta.model";

export class CursoModel {
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
    plataforma?: PlataformaModel;
    areascurso?: AreaCursoModel[];
    rutas?: RutaModel[];
    profesores?: ProfesorModel[];
}