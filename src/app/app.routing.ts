import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegistroComponent } from "./auth/registro/registro.component";
import { RoleGuard } from "./guards/role.guard";
import { IsAuthenticatedGuard } from "./guards/is-authenticated.guard";
import { CoreModule } from "./core/core.module";
import { AlarmModule } from "./alarm/alarm.module";

const routes: Routes = [
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "",
		component: AdminLayoutComponent,
		canActivate: [IsAuthenticatedGuard],
		children: [
			{
				path: "",
				loadChildren: () =>
					import("./layouts/admin-layout/admin-layout.module").then(
						(m) => m.AdminLayoutModule
					),
			},
		],
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "signup",
		component: RegistroComponent,
	},
	{
		path: "**",
		redirectTo: "menu",
	},
];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes, {
			useHash: true,
		}),
	],
})
export class AppRoutingModule {}
