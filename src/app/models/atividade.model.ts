import { Serie } from '../models/serie.model';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';
export interface Atividade {
    id?: number
    titulo:string
    serie: Serie
    materia: Categoria
    imagem: any
    descricao: string
    autor: string
    data: string
}