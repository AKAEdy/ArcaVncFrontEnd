import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { GeneralComponent } from './general/general.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AccountComponent,
    GeneralComponent,
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatInputModule, 
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule, 
    MatCardModule, 
    MatIconModule
  ]
})
export class AccountModule { }
