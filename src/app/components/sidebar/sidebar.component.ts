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

    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },

    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },

    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },

    { path: '/registrofichaclinica', title: 'REGISTRO FICHA CLINICA',  icon:'location_on', class: '' }, // nueva
    { path: '/tratamiento', title: 'REGISTRO TRATAMIENTO',  icon:'location_on', class: '' }, // map
    { path: '/medicacion', title: 'REGISTRO MEDICACION',  icon:'library_books', class: '' }, //typography
    
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
