import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ROLES_POR_MODULOS } from "../auth.service";
export interface Menu { //por si hay que mandar ya algo especifico pero no creo
	tittle: string;
	icon?: string;
	url?: string;
	ref?: string
	roles?: String[],
	items?: Menu[];
}

@Injectable({
	providedIn: "root",
})
export class SidebarService {
	constructor() { }

	private menuItems$ = new BehaviorSubject<any[]>([
		{
			tittle: 'Inicio',
			icon: 'fa fa-home',
			url: 'menu',
		},
		{
			tittle: 'Gestión de adopciones',
			icon: 'fa fa-heart',
			ref: 'adopciones',
			roles: ROLES_POR_MODULOS.MODULO_ADOPCIONES,
			items: [
				{
					tittle: 'Listar adoptados',
					url: 'listaAdoptado',
				},
				{
					tittle: 'Registrar adoptados',
					url: 'registrarAdoptado',
				}
			]
		},
		{
			tittle: 'Gestión de animales',
			icon: 'fa fa-paw',
			ref: 'animales',
			items: [
				{
					tittle: 'Listar de animales',
					url: 'RegistroVoluntariado',
				},
				{
					tittle: 'Registrar animales',
					url: 'user-profile',
				}
			]
		},
		{
			tittle: 'Gestión de personas',
			icon: 'fa fa-user',
			ref: 'personas',
			items: [
				{
					tittle: 'Listar de personas',
					url: 'listaPersonas',
				},
				{
					tittle: 'Registrar personas',
					url: 'registroPersonas',
				}
			]
		}
		, {
			tittle: 'Gestión de medicamentos',
			icon: 'fa fa-user',
			ref: 'medicamentos',
			items: [
				{
					tittle: 'Listar de medicamentos',
					url: 'listaMedicamentos',
				},
				{
					tittle: 'Registrar medicamentos',
					url: 'registroMedicamentos',
				}
			]
		}
	]);
	_menuItems$ = this.menuItems$.asObservable();

}


