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
import { Cita } from './cita';
import { ServicioArca } from './servicioArca';

export interface DetalleCita { 
    cita?: Cita;
    id?: number;
    servicioArca?: ServicioArca;
}