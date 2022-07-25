import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegistroComponent } from "./auth/registro/registro.component";
import { IsAuthenticatedGuard } from "./guards/is-authenticated.guard";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";


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
