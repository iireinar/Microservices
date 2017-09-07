import { BaseModel } from './base.model';
import { UnidadeFederativa } from './unidade.federativa'

export class Municipio extends BaseModel {
  nome: string,
  unidadeFederativa: UnidadeFederativa
}
