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

	private menuItems$ = new BehaviorSubject<any>([
		{ /* Inicio */
			tittle: 'Inicio',
			icon: 'fa fa-home',
			url: 'menu',
		},
		{/* Adopciones */
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
		{  /* Animales */
			tittle: 'Gestión de animales',
			icon: 'fa fa-paw',
			ref: 'animales',
			items: [
				{
					tittle: 'Listar de animales',
					url: 'table-list',
				},
				{
					tittle: 'Registrar animales',
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
					tittle: 'Lista de vaunas',
					url: 'listarVacunas',
				},
				{
					tittle: 'Registrar vacunas',
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


