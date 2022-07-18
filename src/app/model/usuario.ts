/**
 * ARCA
 * Aqui descripcion de la api
 *
 * OpenAPI spec version: 0.0.1
 * Contact: no hay
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Persona } from './persona';
import { Rol } from './rol';

export interface Usuario { 
    enabled?: boolean;
    id?: number;
    password?: string;
    persona?: Persona;
    roles?: Array<Rol>;
    username?: string;
}