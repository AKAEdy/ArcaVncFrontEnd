import { Injectable } from "@angular/core";
import { ROLES_POR_MODULOS } from "app/enum/role";
import { BehaviorSubject } from "rxjs";
export interface Menu {
	//por si hay que mandar ya algo especifico pero no creo
	tittle: string;
	icon?: string;
	url?: string;
	ref?: string;
	roles?: String[];
	items?: Menu[];
}

@Injectable({
	providedIn: "root",
})
export class SidebarService {
	constructor() {}
	//Este formato ayuda a implementar de manera general cualquier tipo de propiedad al menu de sidebar
	//Como campos obligatoriso en un primer nivel  {url, tittle}
	//Como campos obligatoriso si contiene un segundo nivel  {ref, tittle, items[{tittle,url}]}
	//De manera Predeterminada si no se asigna un tittle sera 'Dasboard'
	private menuItems$ = new BehaviorSubject<any>([
		{
			tittle: "Inicio",
			icon: "fa fa-home",
			url: "menu", //path que corresponde a los componentes del Admin Layout Routing o cualquier otro layout routing.
			/* Si es necesario se pueden adicionar propiedades a este nivel como a niveles mas bajos, ejemplo : class : 'mt-2' , roles:['ROLE_EJEMPLO'] ...*/
		},
		{
			tittle: "Gestión de adopciones",
			icon: "fa fa-heart",
			ref: "adopciones", // ref(referencia) Necesario para desplegar submenus del modulo si esque contiene alguno.
			roles: ROLES_POR_MODULOS.MODULO_ADOPCIONES, //Adicionalmente previene la vista de los menus y submenus si no corresponde con algun rol asignado
			items: [
				{
					tittle: "Listar adoptados",
					url: "listaAdoptado",

					// subitems: [{
					// 	subtittle: "SEGUIMIENTO DE LA MASCOTA",
					// 	url: "registrar-seguimiento"
					// }]
					//Los submenus, también pueden tener roles
				},
				{
					tittle: "Registrar adoptados",
					url: "registrarAdoptado",
				},
				{
					tittle: "Registrar adoptante",
					url: "registrarAdoptantes",
				},
			],
		},
		{
			tittle: "Gestión de animales",
			icon: "fa fa-paw",
			ref: "animales",
			items: [
				{
					tittle: "Informacion Mascotas",
					url: "listaMascotas",

					subitems: [{
						subtittle: "PERFIL ANIMAL",
						url: "perfilAnimal",
					}]
				},
				{
					tittle: "Registrar nueva Mascota",
					url: "registrar-animal-refugio",
				},
				{
					tittle: "REGISTRO MEDICACIÓN",
					url: "medicacion",
				},
			],
		},
		{
			tittle: "Gestión de personas",
			icon: "fa fa-user",
			ref: "personas",
			items: [
				{
					tittle: "Listar de personas",
					url: "listaPersonas",
				},
				{
					tittle: "Registrar personas",
					url: "registroPersonas",
				},
			],
		},
		{
			tittle: "Gestión de medicamentos",
			icon: "fa fa-medkit",
			ref: "medicamentos",
			items: [
				{
					tittle: "Listar de medicamentos",
					url: "listaMedicamentos",
				},
				{
					tittle: "Registrar medicamentos",
					url: "registroMedicamentos",
				},
			],
		},
		{
			tittle: "Gestión de Citas",
			icon: "fa fa-calendar-o",
			ref: "citas",
			items: [
				{
					tittle: "Listar Citas",
					url: "listaCitas",
				},
				{
					tittle: "Registro de Citas",
					url: "registrarCitas",
				},
			],
		},
		{
			tittle: "Gestión de vacunas",
			icon: "fa fa-tint",
			ref: "vacunas",
			items: [
				{
					tittle: "Lista de Vacunas",
					url: "listarVacunas",
				},
				{
					tittle: "Registrar Vacunas",
					url: "registrarVacunas",
				},
			],
		},
		{
			tittle: "Gestión de Veterinarios",
			icon: "fa fa-user-md",
			ref: "veterinarios",
			items: [
				{
					tittle: "Lista de Veterinarios",
					url: "listarVeterinarios",
				},
				{
					tittle: "Registrar Veterinarios",
					url: "registrarVeterinarios",
				},
			],
		},
		{
			tittle: " Gestión de Voluntarios",
			icon: "fa fa-male",
			ref: "voluntarios",
			items: [
				{
					tittle: "Lista de Voluntarios",
					url: "listarVoluntarios",
				},
				{
					tittle: "Registrar Voluntarios",
					url: "registrarVoluntarios",
				},
			],
		},
		{
			tittle: " Gestión de Donaciones",
			icon: "fa fa-money",
			ref: "donaciones",
			items: [
				{
					tittle: "Listar de donaciones",
					url: "listarDonaciones",
				},
				{
					tittle: "Registrar donaciones",
					url: "registrarDonaciones",
				},
			],
		},
		{
			tittle: "Historial alertas",
			icon: "fa fa-bell",
			url: "alarms"
		},
	]);
	_menuItems$ = this.menuItems$.asObservable();
}
