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
import { Veterinario } from './veterinario';

export interface FichaClinica { 
    alimentacion?: number;
    conjuntiva?: string;
    costo?: number;
    diagnosticoDiferencial?: string;
    esterilizacion?: string;
    fechaIngreso?: Date;
    frecuenciaCardiaca?: number;
    frecuenciaRespiratoria?: number;
    hallazgos?: string;
    id?: number;
    motivoConsulta?: string;
    mucosas?: string;
    pronostico?: string;
    temperatura?: number;
    trc?: string;
    veterinario?: Veterinario;
    examenes_solicitados?: string;
    tipoPaciente?:string;
}
