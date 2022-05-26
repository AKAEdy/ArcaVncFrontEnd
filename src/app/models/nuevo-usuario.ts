import { ResolveStart } from "@angular/router";
import { Rol } from "./rol";

export class NuevoUsuario {
    // email: string;
    password: string;
    username: string;
    // nombre:string;
    // telefono:string;
    roles:Rol;

    constructor(password: string,  roles:string, username: string, ) {
        // this.email = email;
        this.password = password;
        // this.nombre = nombre;
        this.username = username;
        // this.telefono = telefono;
        // this.roles.nombre = roles;
        
        
    }

    registro(){

    }
}
