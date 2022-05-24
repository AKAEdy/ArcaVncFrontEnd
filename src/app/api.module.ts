import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdoptanteControllerService } from './api/adoptanteController.service';
import { AnimalesService } from './api/animales.service';
import { FichasClnicasService } from './api/fichasClnicas.service';
import { PersonasService } from './api/personas.service';
import { VeterinariosService } from './api/veterinarios.service';
import { VoluntarioControllerService } from './api/voluntarioController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdoptanteControllerService,
    AnimalesService,
    FichasClnicasService,
    PersonasService,
    VeterinariosService,
    VoluntarioControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
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
