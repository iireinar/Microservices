import { BaseModel } from './base.model';
import { Pais } from './pais'

export class UnidadeFederativa extends BaseModel {
  nome: string,
  codigo: string,
  pais: Pais
}
