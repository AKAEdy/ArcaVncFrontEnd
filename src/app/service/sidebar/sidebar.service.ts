import { Injectable } from "@angular/core";
import { ROLES_POR_MODULOS } from 'app/enum/role';
import { BehaviorSubject } from 'rxjs';
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
	constructor () { }
	//Este formato ayuda a implementar de manera general cualquier tipo de propiedad al menu de sidebar
	//Como campos obligatoriso en un primer nivel  {url, tittle}
	//Como campos obligatoriso si contiene un segundo nivel  {ref, tittle, items[{tittle,url}]}
	//De manera Predeterminada si no se asigna un tittle sera 'Dasboard'
	private menuItems$ = new BehaviorSubject<any>([

		{ /* Inicio */
			tittle: 'Inicio',
			icon: 'fa fa-home',
			url: 'menu', //path que corresponde a los componentes del Admin Layout Routing o cualquier otro layout routing.
			/* Si es necesario se pueden adicionar propiedades a este nivel como a niveles mas bajos, ejemplo : class : 'mt-2' , roles:['ROLE_EJEMPLO'] ...*/
		},
		{/* Adopciones */
			tittle: 'Gestión de adopciones',
			icon: 'fa fa-heart',
			ref: 'adopciones',// ref(referencia) Necesario para desplegar submenus del modulo si esque contiene alguno.
			roles: ROLES_POR_MODULOS.MODULO_ADOPCIONES, //Adicionalmente previene la vista de los menus y submenus si no corresponde con algun rol asignado
			items: [
				{
					tittle: 'Listar adoptados',
					url: 'listaAdoptado',
					//Los submenus, también pueden tener roles
				},
				{
					tittle: 'Registrar adoptados',
					url: 'registrarAdoptado',
				}
			]
		},
		{  /* Animales */
			tittle: 'Gestión de animales',
			icon: 'fa fa-paw',
			ref: 'animales',
			items: [
				{
					tittle: 'Listado de mascotas',
					url: 'table-list',
				},
				{
					tittle: 'Registro de ingreso de mascota',
					url: 'user-profile',
				}
				,
				{
					tittle: 'REGISTRO FICHA CLINICA',
					url: 'registrofichaclinica',
				}
				,
				{
					tittle: 'REGISTRO TRATAMIENTO',
					url: 'tratamiento',
				}
				,
				{
					tittle: 'REGISTRO MEDICACIÓN',
					url: 'medicacion',
				}
			]
		},
		{/* Personas */
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
		, {/* Medicamentos */
			tittle: 'Gestión de medicamentos',
			icon: 'fa fa-medkit',
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
		, {/* Citas */
			tittle: 'Gestión de Citas',
			icon: 'fa fa-calendar-o',
			ref: 'citas',
			items: [
				{
					tittle: 'Listar Citas',
					url: 'listaCitas',
				},
				{
					tittle: 'Registro de Citas',
					url: 'registrarCitas',
				}
			]
		}
		, {/* Vacunas */
			tittle: 'Gestión de vacunas',
			icon: 'fa fa-tint',
			ref: 'vacunas',
			items: [
				{
					tittle: 'Lista de Vacunas',
					url: 'listarVacunas',
				},
				{
					tittle: 'Registrar Vacunas',
					url: 'registrarVacunas',
				}
			]
		}
		, {/* Veterinarios */
			tittle: 'Gestión de Veterinarios',
			icon: 'fa fa-user-md',
			ref: 'veterinarios',
			items: [
				{
					tittle: 'Lista de Vacunas',
					url: 'listarVeterinarios',
				},
				{
					tittle: 'Registrar Vacunas',
					url: 'registrarVeterinarios',
				}
			]
		}
	]);
	_menuItems$ = this.menuItems$.asObservable();

}


