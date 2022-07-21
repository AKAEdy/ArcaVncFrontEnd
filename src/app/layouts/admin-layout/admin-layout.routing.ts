import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { RegistrarAnimalRefugioComponent } from "../../components/arca/animal-refugio/registrar-animal-refugio/registrar-animal-refugio";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { FichaClinicaComponent } from "app/components/arca/clinica/ficha-clinica/ficha-clinica.component";
import { RegistrarAdoptadoComponent } from "app/components/arca/animal-refugio/adoptar-animal/registrar-adoptado/registrar-adoptado.component";
import { ListaAdoptadoComponent } from "app/components/arca/animal-refugio/adoptar-animal/lista-adoptado/lista-adoptado.component";
import { ListaPersonaComponent } from "app/lista-persona/lista-persona.component";
import { RegistrarPersonaComponent } from "app/registrar-persona/registrar-persona.component";
import { ListarMedicamentoComponent } from "app/listar-medicamento/listar-medicamento.component";
import { RegistrarMedicamentoComponent } from "app/registrar-medicamento/registrar-medicamento.component";
import { ListarCitasComponent } from "app/listar-citas/listar-citas.component";
import { ListarVacunasComponent } from "app/listar-vacunas/listar-vacunas.component";
import { RegistrarVacunasComponent } from "app/registrar-vacunas/registrar-vacunas.component";
import { ListarAdoptanteComponent } from "app/listar-adoptante/listar-adoptante.component";
import { RoleGuard } from "app/guards/role.guard";
import { IsAuthenticatedGuard } from "app/guards/is-authenticated.guard";
import { RegistrarVeterinariosComponent } from "app/registrar-veterinarios/registrar-veterinarios.component";
import { ListarVeterinariosComponent } from "app/listar-veterinarios/listar-veterinarios.component";
import { RegistrarAdoptanteComponent } from "app/registrar-adoptante/registrar-adoptante.component";
import { RegistrarDonacionesComponent } from "app/registrar-donaciones/registrar-donaciones.component";
import { ListarDonacionesComponent } from "app/listar-donaciones/listar-donaciones.component";
import { RegistrarVoluntariosComponent } from "app/registrar-voluntarios/registrar-voluntarios.component";
import { ListarVoluntariosComponent } from "app/listar-voluntarios/listar-voluntarios.component";
import { RegistroCarnetComponent } from "app/registro-carnet/registro-carnet.component";
import { RegistrarSeguimientoComponent } from "app/registrar-seguimiento/registrar-seguimiento.component";
import { TratamientoComponent } from "app/components/arca/clinica/tratamiento/tratamiento.component";
import { AlarmListingPageComponent } from 'app/alarm/alarm-listing-page/alarm-listing-page.component'

import { RegistrarUsuariosComponent } from "app/components/arca/usuarios/registrar-usuarios/registrar-usuarios.component";
import { ListarUsuariosComponent } from "app/components/arca/usuarios/listar-usuarios/listar-usuarios.component";
import { EditCarnetComponent } from "app/edit-carnet/edit-carnet.component";
import { EditFichaComponent } from "app/edit-ficha/edit-ficha.component";
import { RegistrarCitasComponent } from "app/components/arca/servicios-arca/registrar-citas/registrar-citas.component";

import { PerfilusuarioComponent } from "app/perfilusuario/perfilusuario.component";


export const AdminLayoutRoutes: Routes = [
	{
		path: "menu",
		component: DashboardComponent,
		canActivate: [IsAuthenticatedGuard],
	},
	{
		path: "registrar-animal-refugio",
		component: RegistrarAnimalRefugioComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "table-list",
		component: TableListComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "medicacion",
		component: TypographyComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "tratamiento/:id",
		component: TratamientoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	}, // map
	{
		path: "notifications",
		component: NotificationsComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "upgrade",
		component: UpgradeComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "registroCarnet",
		component: RegistroCarnetComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "notifications/:id",
		component: NotificationsComponent,
		canActivate: [IsAuthenticatedGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "editCarnet/:id",
		component: EditCarnetComponent,
		canActivate: [IsAuthenticatedGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "editFicha/:id",
		component: EditFichaComponent,
		canActivate: [IsAuthenticatedGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "upgrade/:id",
		component: UpgradeComponent,
		canActivate: [IsAuthenticatedGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "registrofichaclinica",
		component: FichaClinicaComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "listaAdoptado",
		component: ListaAdoptadoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarAdoptado",
		component: RegistrarAdoptadoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarAdoptado/:id",
		component: RegistrarAdoptadoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listaPersonas",
		component: ListaPersonaComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "registroPersonas",
		component: RegistrarPersonaComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listaMedicamentos",
		component: ListarMedicamentoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registroMedicamentos",
		component: RegistrarMedicamentoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarVacunas",
		component: RegistrarVacunasComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listarVacunas",
		component: ListarVacunasComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarCitas",
		component: RegistrarCitasComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listaCitas",
		component: ListarCitasComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarVeterinarios",
		component: RegistrarVeterinariosComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listarVeterinarios",
		component: ListarVeterinariosComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarAdoptantes",
		component: RegistrarAdoptanteComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listarAdoptantes",
		component: ListarAdoptanteComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registroCarnet/:id",
		component: RegistroCarnetComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "registrar-seguimiento",
		component: RegistrarSeguimientoComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN", "ROLE_VETERINARIO"] },
	},
	{
		path: "registrarDonaciones",
		component: RegistrarDonacionesComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listarDonaciones",
		component: ListarDonacionesComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarVoluntarios",
		component: RegistrarVoluntariosComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listarVoluntarios",
		component: ListarVoluntariosComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "registrarUsuarios",
		component: RegistrarUsuariosComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{
		path: "listarUsuarios",
		component: ListarUsuariosComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	},
	{ path: 'alarms', component: AlarmListingPageComponent },
	{
		path: "perfil",
		component: PerfilusuarioComponent,
		canActivate: [IsAuthenticatedGuard, RoleGuard],
		data: { roles: ["ROLE_ADMIN"] },
	}
];
