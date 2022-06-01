import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/menu', title: 'Inicio',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/RegistroVoluntariado', title: 'Registrar Voluntariado',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'map',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/registrofichaclinica', title: 'REGISTRO FICHA CLINICA',  icon:'location_on', class: '' },
    { path: '/listaAdoptado', title: 'Lista de Adoptados',  icon: 'dashboard', class: '' },
    { path: '/registrarAdoptado', title: 'Registro de Adoptados',  icon: 'dashboard', class: '' },
    { path: '/listaPersonas', title: 'Lista de Personas',  icon: 'dashboard', class: '' },
    { path: '/registroPersonas', title: 'Registro de Personas',  icon: 'dashboard', class: '' },
    { path: '/listaMedicamentos', title: 'Lista de Medicamento',  icon: 'dashboard', class: '' },
    { path: '/registroMedicamentos', title: 'Registro de Medicamento',  icon: 'dashboard', class: '' },
    { path: '/RegistroVoluntariado', title: 'Registro de Voluntariado',  icon:'person', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
