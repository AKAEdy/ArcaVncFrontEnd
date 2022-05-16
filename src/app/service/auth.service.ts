import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDTO } from 'app/models/jwt-dto';
import { LoginUsuario } from 'app/models/login-usuario';
import { NuevoUsuario } from 'app/models/nuevo-usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:9898/api/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'iniciarSesion', loginUsuario);
  }
}
