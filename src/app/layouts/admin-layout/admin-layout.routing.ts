import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FichaClinicaComponent } from 'app/ficha-clinica/ficha-clinica.component';
import { RegistrarAdoptadoComponent } from 'app/registrar-adoptado/registrar-adoptado.component';
import { ListaAdoptadoComponent } from 'app/lista-adoptado/lista-adoptado.component';
import { ListaPersonaComponent } from 'app/lista-persona/lista-persona.component';
import { RegistrarPersonaComponent } from 'app/registrar-persona/registrar-persona.component';
import { ListarMedicamentoComponent } from 'app/listar-medicamento/listar-medicamento.component';
import { RegistrarMedicamentoComponent } from 'app/registrar-medicamento/registrar-medicamento.component';
import { ListarCitasComponent } from 'app/listar-citas/listar-citas.component';
import { RegistrarCitasComponent } from 'app/registrar-citas/registrar-citas.component';
import { ListarVacunasComponent } from 'app/listar-vacunas/listar-vacunas.component';
import { RegistrarVacunasComponent } from 'app/registrar-vacunas/registrar-vacunas.component';
import { ListarAdoptanteComponent } from 'app/listar-adoptante/listar-adoptante.component';
import { RoleGuard } from 'app/guards/role.guard';
import { IsAuthenticatedGuard } from 'app/guards/is-authenticated.guard';
import { RegistrarVeterinariosComponent } from 'app/registrar-veterinarios/registrar-veterinarios.component';
import { ListarVeterinariosComponent } from 'app/listar-veterinarios/listar-veterinarios.component';
import { RegistrarAdoptanteComponent } from 'app/registrar-adoptante/registrar-adoptante.component';
import { RegistrarDonacionesComponent } from 'app/registrar-donaciones/registrar-donaciones.component';
import { ListarDonacionesComponent } from 'app/listar-donaciones/listar-donaciones.component';
import { RegistrarVoluntariosComponent } from 'app/registrar-voluntarios/registrar-voluntarios.component';
import { ListarVoluntariosComponent } from 'app/listar-voluntarios/listar-voluntarios.component';
import { RegistroCarnetComponent } from 'app/registro-carnet/registro-carnet.component';
import { RegistrarSeguimientoComponent } from 'app/registrar-seguimiento/registrar-seguimiento.component';



export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }


    //RUTAS PARA LAS DIRECCIONES

    { path: 'menu',      component: DashboardComponent ,canActivate:[IsAuthenticatedGuard]},


    { path: 'user-profile',   component: UserProfileComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN' ,'ROLE_VETERINARIO']} },
    { path: 'table-list',     component: TableListComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']} },
    { path: 'medicacion',     component: TypographyComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'icons',          component: IconsComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'tratamiento/:id',           component: MapsComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}}, // map
    { path: 'notifications',  component: NotificationsComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
    { path: 'upgrade',        component: UpgradeComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
    { path: 'registroCarnet',   component: RegistroCarnetComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN', 'ROLE_VETERINARIO']}},
 

    { path: 'user-profile',   component: UserProfileComponent,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN', 'ROLE_VETERINARIO']} },
    { path: 'table-list',     component: TableListComponent,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']} },
    { path: 'medicacion',     component: TypographyComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
    { path: 'icons',          component: IconsComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
    { path: 'tratamiento',           component: MapsComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}}, // map
    { path: 'notifications/:id',  component: NotificationsComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
    { path: 'upgrade/:id',        component: UpgradeComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
     { path: 'registrofichaclinica',   component: FichaClinicaComponent,canActivate:[IsAuthenticatedGuard,RoleGuard] ,data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']} },
    { path: 'listaAdoptado',   component: ListaAdoptadoComponent,canActivate:[IsAuthenticatedGuard,RoleGuard] ,data:{roles:['ROLE_ADMIN']}},
    { path: 'registrarAdoptado',   component: RegistrarAdoptadoComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'listaPersonas',   component: ListaPersonaComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN','ROLE_VETERINARIO']}},
    { path: 'registroPersonas',   component: RegistrarPersonaComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listaMedicamentos',   component: ListarMedicamentoComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'registroMedicamentos',   component: RegistrarMedicamentoComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'registrarVacunas',   component: RegistrarVacunasComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listarVacunas',   component: ListarVacunasComponent  ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'registrarCitas',   component: RegistrarCitasComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listaCitas',   component: ListarCitasComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'registrarVeterinarios',   component: RegistrarVeterinariosComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listarVeterinarios',   component: ListarVeterinariosComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'registrarAdoptantes',   component: RegistrarAdoptanteComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listarAdoptantes',   component: ListarAdoptanteComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'registrarAdoptantes',   component: RegistrarAdoptanteComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'registroCarnet/:id',   component: RegistroCarnetComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN', 'ROLE_VETERINARIO']}},
    { path: 'registrar-seguimiento',   component: RegistrarSeguimientoComponent ,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN', 'ROLE_VETERINARIO']}},
    { path: 'registrarDonaciones',   component: RegistrarDonacionesComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listarDonaciones',   component: ListarDonacionesComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'registrarVoluntarios',   component: RegistrarVoluntariosComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listarVoluntarios',   component: ListarVoluntariosComponent,canActivate:[IsAuthenticatedGuard,RoleGuard],data:{roles:['ROLE_ADMIN']} },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },

];
