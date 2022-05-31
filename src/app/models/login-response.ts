import { Persona } from "app";

export interface LoginResponse {
	id?:number;
	username?: string;
	persona?:Persona;
	token?:Token;
}

export interface Token{
	tokenType?: TokenType ;
    tokenValue?:string ;
    duration:number;
    expiryDate:Date;
}

export enum TokenType {
	ACCESS
}
