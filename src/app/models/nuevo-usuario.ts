export class NuevoUsuario {
    email: string;
    password: string;
    username: string;
    nombre:string;
    telefono:string;
    roles:string[];

    constructor(email: string,password: string, nombre: string, username: string, telefono:string, roles:string[] ) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.username = username;
        this.telefono = telefono;
        this.roles = roles;
        
        
    }
}
