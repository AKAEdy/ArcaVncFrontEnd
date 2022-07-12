import { Component, OnInit } from '@angular/core'
import { AuthService } from 'app/service/auth.service'
import { SidebarService } from 'app/service/sidebar/sidebar.service'

declare const $: any
declare interface RouteInfo {
	path: string
	title: string
	icon: string
	class: string
}
// export const ROUTES: RouteInfo[] = [

//     { path: '/menu', title: 'Inicio',  icon: 'dashboard', class: '' },

//     { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },

//     { path: '/RegistroVoluntariado', title: 'Registrar Voluntariado',  icon:'person', class: '' },

//     { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },

//     { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },

//     { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },

//     { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },

//     { path: '/registrofichaclinica', title: 'REGISTRO FICHA CLINICA',  icon:'location_on', class: '' },
//     { path: '/listaAdoptado', title: 'Lista de Adoptados',  icon: 'dashboard', class: '' },
//     { path: '/registrarAdoptado', title: 'Registro de Adoptados',  icon: 'dashboard', class: '' },
//     { path: '/listaPersonas', title: 'Lista de Personas',  icon: 'dashboard', class: '' },
//     { path: '/registroPersonas', title: 'Registro de Personas',  icon: 'dashboard', class: '' },
//     { path: '/listaMedicamentos', title: 'Lista de Medicamento',  icon: 'dashboard', class: '' },
//     { path: '/registroMedicamentos', title: 'Registro de Medicamento',  icon: 'dashboard', class: '' },
//     { path: '/RegistroVoluntariado', title: 'Registro de Voluntariado',  icon:'person', class: '' },
//     // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
//     // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
//     // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//     // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//     // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//     // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//     // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },


// { path: '/registrofichaclinica', title: 'REGISTRO FICHA CLINICA',  icon:'location_on', class: '' }, // nueva
// { path: '/tratamiento', title: 'REGISTRO TRATAMIENTO',  icon:'location_on', class: '' }, // map
// { path: '/medicacion', title: 'REGISTRO MEDICACION',  icon:'library_books', class: '' }, //typography
// { path: '/listarCitas', title: 'LISTA DE CITAS',  icon:'person', class: '' },
// { path: '/registroVeterinarios', title: 'Registro de Veterinarios',  icon:'person', class: '' },
// { path: '/registroCarnet', title: 'Registro Carnet',  icon:'person', class: '' },


// ];

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {
	menuItems: any[]
	constructor (private _authService: AuthService, private _sidebar: SidebarService) { }
	ngOnInit() {
		this._sidebar._menuItems$.subscribe(menuItems => this.menuItems = menuItems)
	}
	isMobileMenu() {
		if ($(window).width() > 991) {
			return false
		}
		return true
	};
	hasRole(roles: any[]): boolean {
		if (roles) {
			return this._authService.hasRoles(roles)
		}
		return true
	}
}
