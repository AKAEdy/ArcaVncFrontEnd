
export interface fichaClinicaPost { 
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
    personaId?: number;
    animalId?:number;
    examenes_solicitados?: string;
    tipoPaciente?:string;
}