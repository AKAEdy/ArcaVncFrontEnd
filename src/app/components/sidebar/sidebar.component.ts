import { Component, OnInit } from '@angular/core'
import { AuthService } from 'app/service/auth.service'
import { Menu, SidebarService } from 'app/service/sidebar/sidebar.service'

declare const $: any
declare interface RouteInfo {
	path: string
	title: string
	icon: string
	class: string
}

// Ya no es necesario, Usar servicio Sidebar
export const ROUTES: RouteInfo[] = [
	{ path: '/registrofichaclinica', title: 'REGISTRO FICHA CLINICA', icon: 'location_on', class: '' }, // nueva
	{ path: '/tratamiento', title: 'REGISTRO TRATAMIENTO', icon: 'location_on', class: '' }, // map
	{ path: '/medicacion', title: 'REGISTRO MEDICACION', icon: 'library_books', class: '' }, //typography
	{ path: '/listarCitas', title: 'LISTA DE CITAS', icon: 'person', class: '' },
	{ path: '/registroVeterinarios', title: 'Registro de Veterinarios', icon: 'person', class: '' },
	{ path: '/registroCarnet', title: 'Registro Carnet', icon: 'person', class: '' },
];

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
		if ($(window).width() > 991) {return false}
		return true
	};
	hasRole(roles: any[]): boolean {
		if (roles) {
			return this._authService.hasRoles(roles)
		}
		return true
	}
}
