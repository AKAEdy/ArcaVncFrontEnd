import { ResolveStart } from "@angular/router";
import { Persona } from "app";
import { Rol } from "./rol";

export interface NuevoUsuario {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    persona?: Persona;
    roles?: Rol[] ;
    enabled?:boolean;
}
