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
import { ListarCitasComponent } from 'app/listar-citas/listar-citas.component';
import { RegistrarCitasComponent } from 'app/registrar-citas/registrar-citas.component';
import { ListarVacunasComponent } from 'app/listar-vacunas/listar-vacunas.component';
import { RegistrarVacunasComponent } from 'app/registrar-vacunas/registrar-vacunas.component';

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
    { path: 'menu',      component: DashboardComponent },
    { path: 'listaAdoptado',   component: ListaAdoptadoComponent },
    { path: 'registrarAdoptado',   component: RegistrarAdoptadoComponent },
    { path: 'listaPersonas',   component: ListaPersonaComponent },
    { path: 'registroPersonas',   component: RegistrarPersonaComponent },
    { path: 'listaMedicamentos',   component: ListarMedicamentoComponent },
    { path: 'listaCitas',   component: ListarCitasComponent },
    { path: 'registrarCitas',   component: RegistrarCitasComponent },
    { path: 'listarVacunas',   component: ListarVacunasComponent},
    { path: 'registrarVacunas',   component: RegistrarVacunasComponent },
    { path: 'registroMedicamentos',   component: RegistrarMedicamentoComponent },  
    { path: 'RegistroVoluntariado',   component: RegistrarVoluntariadoComponent  },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },

];
