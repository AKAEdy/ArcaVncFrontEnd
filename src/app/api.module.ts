import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdopcionesService } from './api/adopciones.service';
import { AdoptantesService } from './api/adoptantes.service';
import { AnimalesRefugioService } from './api/animalesRefugio.service';
import { AuthControllerService } from './api/authController.service';
import { CarnetsDeVacunacinService } from './api/carnetsDeVacunacin.service';
import { CitasService } from './api/citas.service';
import { DonacionesService } from './api/donaciones.service';
import { FichasClnicasService } from './api/fichasClnicas.service';
import { MedicacionesService } from './api/medicaciones.service';
import { MedicamentosService } from './api/medicamentos.service';
import { PersonasService } from './api/personas.service';
import { RolesService } from './api/roles.service';
import { SeguimientoDeAdoptadosService } from './api/seguimientoDeAdoptados.service';
import { ServiciosService } from './api/servicios.service';
import { TratamientosService } from './api/tratamientos.service';
import { UsuariosService } from './api/usuarios.service';
import { VacunasService } from './api/vacunas.service';
import { VeterinariosService } from './api/veterinarios.service';
import { VoluntariosService } from './api/voluntarios.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdopcionesService,
    AdoptantesService,
    AnimalesRefugioService,
    AuthControllerService,
    CarnetsDeVacunacinService,
    CitasService,
    DonacionesService,
    FichasClnicasService,
    MedicacionesService,
    MedicamentosService,
    PersonasService,
    RolesService,
    SeguimientoDeAdoptadosService,
    ServiciosService,
    TratamientosService,
    UsuariosService,
    VacunasService,
    VeterinariosService,
    VoluntariosService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration)  {
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
