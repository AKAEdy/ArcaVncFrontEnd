import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdopcionControllerService } from './api/adopcionController.service';
import { AdoptanteControllerService } from './api/adoptanteController.service';
import { AnimalesService } from './api/animales.service';
import { AuthControllerService } from './api/authController.service';
import { CitasService } from './api/citas.service';
import { FichasClnicasService } from './api/fichasClnicas.service';
import { PersonasService } from './api/personas.service';
import { ServiciosService } from './api/servicios.service';
import { UserControllerService } from './api/userController.service';
import { VacunasService } from './api/vacunas.service';
import { VeterinariosService } from './api/veterinarios.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdopcionControllerService,
    AdoptanteControllerService,
    AnimalesService,
    AuthControllerService,
    CitasService,
    FichasClnicasService,
    PersonasService,
    ServiciosService,
    UserControllerService,
    VacunasService,
    VeterinariosService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration) {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
