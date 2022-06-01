export class Medicacion {
    
    id_medicacion: number;
    descripcion_md: string;
    dosis: string;
    frecuencia: string;
    duracion: string;
    fecha_caducidad: string;
    id_medicamento: number;

    constructor(

        id_medicacion: number,
        descripcion_md: string,
        dosis: string,
        frecuencia: string,
        duracion: string,
        fecha_caducidad: string,
        id_medicamento: number    
        ){

        this.id_medicacion=id_medicacion;
        this.descripcion_md=descripcion_md;
        this.dosis=dosis;
        this.frecuencia=frecuencia;
        this.duracion=duracion;
        this.fecha_caducidad=fecha_caducidad;
        this.id_medicamento = id_medicamento;        
    }
}


