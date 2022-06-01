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
<<<<<<< HEAD
=======
import { ListaAdoptadoComponent } from './lista-adoptado/lista-adoptado.component';


import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';

import { interceptorProvider } from './interceptor/interceptor.service';
>>>>>>> ab2bfb46631789a1d7aa703ee476f17520295f70
import { AdopcionControllerService } from './api/adopcionController.service';
import { AdoptanteControllerService } from './api/adoptanteController.service';
import { AnimalesService } from './api/animales.service';
import { FichasClnicasService } from './api/fichasClnicas.service';
import { PersonasService } from './api/personas.service';
import { VeterinariosService } from './api/veterinarios.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    AdopcionControllerService,
    AdoptanteControllerService,
    AnimalesService,
    FichasClnicasService,
    PersonasService,
    VeterinariosService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
