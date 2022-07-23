import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { GeneralComponent } from './general/general.component';
import { PasswordComponent } from './password/password.component';
const routes: Routes = [
  {
		path: '',
		component: AccountComponent,
		children: [
			{
				path: '',
				redirectTo: 'general',
				pathMatch: 'cuenta'
			},
			{
				path: "general",
				component: GeneralComponent,
			},
			{
				path: "seguridad",
				component: PasswordComponent,
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
