import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ListaAdoptadoComponent } from './lista-adoptado/lista-adoptado.component';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [	
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegistroComponent,
    ListaAdoptadoComponent,
     
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
