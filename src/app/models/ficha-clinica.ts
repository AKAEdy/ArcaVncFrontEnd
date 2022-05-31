import { coerceStringArray } from "@angular/cdk/coercion";

export class FichaClinica {

            id_ficha_clinica: number;
            fecha_ingreso: string;
            motivo_consulta: string;
            hallazgos: string;
            temperatura: string;
            conjuntiva: string;
            f_c: string;
            f_r: string;
            t_r_c: string;
            mucosas: string;
            vacunas: string;
            desparacitaciones: string;
            esterilizacion: string;
            alimentacion: string;
            pronostico: string;
            examenes_solicitados: string;
            diagnostico_diferencial: string;
            costos: number;
            id_historia: number;
            id_veterinario: number;
            id_vacuna: number;

            constructor( 
                id_ficha_clinica: number,
                fecha_ingreso: string,
                motivo_consulta: string,
                hallazgos: string,
                temperatura: string,
                conjuntiva: string,
                f_c: string,
                f_r: string,
                t_r_c: string,
                mucosas: string,
                vacunas: string,
                desparacitaciones: string,
                esterilizacion: string,
                alimentacion: string,
                pronostico: string,
                examenes_solicitados: string,
                diagnostico_diferencial: string,
                costos: number,
                id_historia: number,
                id_veterinario: number,
                id_vacuna: number){

                    this.id_ficha_clinica = id_ficha_clinica;
                    this.fecha_ingreso = fecha_ingreso;
                    this.motivo_consulta = motivo_consulta;
                    this.hallazgos = hallazgos;
                    this.temperatura = temperatura;
                    this.conjuntiva = conjuntiva;
                    this.f_c = f_c;
                    this.f_r=f_r;
                    this.t_r_c = t_r_c;
                    this.mucosas=mucosas;
                    this.vacunas=vacunas;
                    this.desparacitaciones=desparacitaciones;
                    this.esterilizacion= esterilizacion;
                    this.alimentacion=alimentacion;
                    this.pronostico=pronostico;
                    this.examenes_solicitados=examenes_solicitados;
                    this.diagnostico_diferencial=diagnostico_diferencial;
                    this.costos=costos;
                    this.id_historia=id_historia;
                    this.id_veterinario=id_veterinario;
                    this.id_vacuna=id_vacuna;


            }

            
    
    
        

}