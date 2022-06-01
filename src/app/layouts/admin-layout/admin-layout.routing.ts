import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RegistrarVoluntariadoComponent } from 'app/registroVoluntariado/registrar-voluntariado/registrar-voluntariado.component';
import { FichaClinicaComponent } from 'app/ficha-clinica/ficha-clinica.component';
import { RegistrarAdoptadoComponent } from 'app/registrar-adoptado/registrar-adoptado.component';
import { ListaAdoptadoComponent } from 'app/lista-adoptado/lista-adoptado.component';
import { ListaPersonaComponent } from 'app/lista-persona/lista-persona.component';
import { RegistrarPersonaComponent } from 'app/registrar-persona/registrar-persona.component';
import { ListarMedicamentoComponent } from 'app/listar-medicamento/listar-medicamento.component';
import { RegistrarMedicamentoComponent } from 'app/registrar-medicamento/registrar-medicamento.component';

import { RoleGuard } from 'app/guards/role.guard';
import { IsAuthenticatedGuard } from 'app/guards/is-authenticated.guard';

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
    { path: 'user-profile',   component: UserProfileComponent,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'table-list',     component: TableListComponent,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'regist',     component: TypographyComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'icons',          component: IconsComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'tratamiento',           component: MapsComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}}, // map
    { path: 'notifications',  component: NotificationsComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'upgrade',        component: UpgradeComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'RegistroVoluntariado',   component: RegistrarVoluntariadoComponent,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}  },

    { path: 'registrofichaclinica',   component: FichaClinicaComponent,canActivate:[IsAuthenticatedGuard] ,data:{roles:['ROLE_ADMIN']} },
    { path: 'listaAdoptado',   component: ListaAdoptadoComponent,canActivate:[IsAuthenticatedGuard] ,data:{roles:['ROLE_ADMIN']}},
    { path: 'registrarAdoptado',   component: RegistrarAdoptadoComponent,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']} },
    { path: 'listaPersonas',   component: ListaPersonaComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'registroPersonas',   component: RegistrarPersonaComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'listaMedicamentos',   component: ListarMedicamentoComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'registroMedicamentos',   component: RegistrarMedicamentoComponent ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']}},
    { path: 'RegistroVoluntariado',   component: RegistrarVoluntariadoComponent  ,canActivate:[IsAuthenticatedGuard],data:{roles:['ROLE_ADMIN']} },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },

];
