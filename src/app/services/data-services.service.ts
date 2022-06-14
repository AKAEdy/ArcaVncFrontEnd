import { Injectable } from '@angular/core';
import { Persona } from 'app/model/persona';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {
  private personaData = new Subject<Persona>();
  public getPersonaData(): Observable<Persona> {
    return this.personaData.asObservable();
  }

  public setPersonaData(persona: Persona) {
    return this.personaData.next(persona);
  }
  constructor() { }
}
