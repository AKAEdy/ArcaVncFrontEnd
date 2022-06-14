import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { RegistrarVoluntariadoComponent } from 'app/registroVoluntariado/registrar-voluntariado/registrar-voluntariado.component';
import { RouterModule } from '@angular/router';
import { FichaClinicaComponent } from 'app/ficha-clinica/ficha-clinica.component';

import { ListaAdoptadoComponent } from 'app/lista-adoptado/lista-adoptado.component';
import { RegistrarAdoptadoComponent } from 'app/registrar-adoptado/registrar-adoptado.component';
import { RegistrarPersonaComponent } from 'app/registrar-persona/registrar-persona.component';
import { ListaPersonaComponent } from 'app/lista-persona/lista-persona.component';
import { RegistrarMedicamentoComponent } from 'app/registrar-medicamento/registrar-medicamento.component';
import { ListarMedicamentoComponent } from 'app/listar-medicamento/listar-medicamento.component';

import { FilteradoptadosPipe } from '../../pipes/filteradoptados.pipe';
import { RegistrarVacunasComponent } from '../../registrar-vacunas/registrar-vacunas.component';
import { ListarVacunasComponent } from '../../listar-vacunas/listar-vacunas.component';
import { ListarCitasComponent } from '../../listar-citas/listar-citas.component';
import { RegistrarCitasComponent } from '../../registrar-citas/registrar-citas.component';


import { MatPaginatorModule } from '@angular/material/paginator';import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RegistrarVeterinariosComponent } from '../../registrar-veterinarios/registrar-veterinarios.component';
import { ListarVeterinariosComponent } from '../../listar-veterinarios/listar-veterinarios.component';
import { EditarPersonaComponent } from '../../components/editar-persona/editar-persona.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    
    // COMPONENTES DEL MENU
    RegistrarVoluntariadoComponent,
    
    FichaClinicaComponent,
    ListaAdoptadoComponent,
    RegistrarAdoptadoComponent,
    ListaAdoptadoComponent,
    ListaPersonaComponent,
    RegistrarPersonaComponent,
    RegistrarMedicamentoComponent,
    ListarMedicamentoComponent,
    FilteradoptadosPipe,
    RegistrarVacunasComponent,
    ListarVacunasComponent,
    ListarCitasComponent,
    RegistrarCitasComponent,
    RegistrarVeterinariosComponent,
    ListarVeterinariosComponent,   
    EditarPersonaComponent,

  ]
})

export class AdminLayoutModule {}
