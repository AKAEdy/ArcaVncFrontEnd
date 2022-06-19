export class Tratamientos {
    
    id_tratamiento: number;
    descripcion_tr: string;
    indicaciones: string;
    estado_tr: string;
    fecha_aplicacion: string;
    id_medicacion: number;
    id_ficha: number;

    constructor(
        id_tratamiento: number,
        descripcion_tr: string,
        indicaciones: string,
        estado_tr: string,
        fecha_aplicacion: string,
        id_medicacion: number,
        id_ficha: number
    ) {
        this.id_tratamiento=id_tratamiento;
        this.descripcion_tr=descripcion_tr;
        this.indicaciones=indicaciones;
        this.estado_tr=estado_tr;
        this.fecha_aplicacion=fecha_aplicacion;
        this.id_medicacion = id_medicacion;
        this.id_ficha=id_ficha;
    }
}


