export interface AnimalRefugioRequest {
     
    nombre?: string;

    especie?: string;

    colorCaracteristicas?:string;

    sexo?:string;

    edad?:number;

    raza?:string;

    lugarEstancia?:string;

    procedencia?:string;

    observacionesProcedencia?:string;

    peso?:number;

    adoptado?:boolean;

    fechaNacimiento?: Date;

    
}