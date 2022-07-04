import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AdopcionControllerService } from './api/adopcionController.service';
import { AdoptanteControllerService } from './api/adoptanteController.service';
import { AnimalesService } from './api/animales.service';
import { FichasClnicasService } from './api/fichasClnicas.service';
import { PersonasService } from './api/personas.service';
import { VeterinariosService } from './api/veterinarios.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CitasService } from './api/citas.service';
import { VacunasService } from './api/vacunas.service';

import { TratamientosService } from './api/tratamientos.service';

import { MedicamentosService } from './api/medicamentos.service';



import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AdoptantesService } from './api/adoptantes.service';
import { DonacionesService } from './api/donaciones.service';
import { VoluntariosService } from './api/voluntarios.service';
import { AnimalesRefugioService } from './api/animalesRefugio.service';
import { CarnetsDeVacunacinService } from './api/carnetsDeVacunacin.service';
import { MedicacionesService } from './api/medicaciones.service';


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
      
    


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AdopcionControllerService,
    AdoptanteControllerService,
    AnimalesService,
    FichasClnicasService,
    PersonasService,
    CitasService,
    VacunasService,
    VeterinariosService,
    MedicamentosService,
    TratamientosService,
    MedicamentosService,
    VeterinariosService ,
    MedicamentosService,
 AnimalesRefugioService,
    AdoptantesService,
    DonacionesService,
    CarnetsDeVacunacinService,
    MedicacionesService,

    VoluntariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
