import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistrarAnimalRefugioComponent} from '../../components/arca/animal-refugio/registrar-animal-refugio/registrar-animal-refugio';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatRippleModule} from '@angular/material/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
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
import {MatStepperModule} from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RegistrarVeterinariosComponent } from '../../registrar-veterinarios/registrar-veterinarios.component';
import { ListarVeterinariosComponent } from '../../listar-veterinarios/listar-veterinarios.component';
import { NgxPrintModule } from 'ngx-print';
import { RegistrarAdoptanteComponent } from '../../registrar-adoptante/registrar-adoptante.component';
import { RegistrarDonacionesComponent } from '../../registrar-donaciones/registrar-donaciones.component';
import { ListarDonacionesComponent } from '../../listar-donaciones/listar-donaciones.component';
import { RegistrarVoluntariosComponent } from '../../registrar-voluntarios/registrar-voluntarios.component';
import { ListarVoluntariosComponent } from '../../listar-voluntarios/listar-voluntarios.component';
import { ListarAdoptanteComponent } from '../../listar-adoptante/listar-adoptante.component';
import { RegistroCarnetComponent } from 'app/registro-carnet/registro-carnet.component';
import { RegistrarSeguimientoComponent } from 'app/registrar-seguimiento/registrar-seguimiento.component';
import { FichaClinicaComponent } from 'app/components/arca/clinica/ficha-clinica/ficha-clinica.component';
import { TratamientoComponent } from 'app/components/arca/clinica/tratamiento/tratamiento.component';
import { FiltermedicamentosPipe } from '../../pipes/filtermedicamentos.pipe';
import { CoreModule } from 'app/core/core.module'
import { AlarmModule } from 'app/alarm/alarm.module'
import { FilteranimalesPipe } from 'app/pipes/filteranimales.pipe';
import { RegistrarUsuariosComponent } from 'app/components/arca/usuarios/registrar-usuarios/registrar-usuarios.component';
import { ListarUsuariosComponent } from '../../components/arca/usuarios/listar-usuarios/listar-usuarios.component';
import { EditCarnetComponent } from 'app/edit-carnet/edit-carnet.component';
import { EditFichaComponent } from 'app/edit-ficha/edit-ficha.component';
import { RegistrarCitasComponent } from 'app/components/arca/servicios-arca/registrar-citas/registrar-citas.component';


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
    MatStepperModule,
	  NgxPrintModule,
	  AlarmModule
  ],
  declarations: [
    DashboardComponent,
    RegistrarAnimalRefugioComponent,
    TableListComponent,
    TypographyComponent,
    TratamientoComponent,
    NotificationsComponent,
    UpgradeComponent,
    // COMPONENTES DEL MENU
    FichaClinicaComponent,
    ListaAdoptadoComponent,
    RegistrarAdoptadoComponent,
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
    RegistrarAdoptanteComponent,
    RegistrarDonacionesComponent,
    ListarDonacionesComponent,
    RegistrarVoluntariosComponent,
    ListarVoluntariosComponent,
    ListarAdoptanteComponent,
    RegistroCarnetComponent,
    RegistrarSeguimientoComponent,
    FiltermedicamentosPipe,
    FilteranimalesPipe,
    RegistrarUsuariosComponent,
    ListarUsuariosComponent,
    EditCarnetComponent,
    EditFichaComponent,
  ]
})

export class AdminLayoutModule {}
