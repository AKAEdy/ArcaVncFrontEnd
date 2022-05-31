import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'app/models/login-response';
import { LoginUsuario } from 'app/models/login-usuario';
import { NuevoUsuario } from 'app/models/nuevo-usuario';
import { Rol } from 'app/models/rol';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';

export interface ROL {
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  redirectUrl = '';


  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(loginUsuario: LoginUsuario): Observable<any> {
    return this.httpClient.post<LoginUsuario>(environment.AUTH_URL + 'login', loginUsuario).pipe(tap((loginResponse: LoginResponse) => {

      this.setAuthToken(loginResponse.token.tokenValue);
      this._isLoggedIn$.next(true);
      console.log(this.redirectUrl);

      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = '';
      } else {
        this.router.navigate(['#']);
      }
    }

    ), catchError(() => {
      console.log('BEEEP ERROR!')
      return of([])
    }));
  }

  private getUser(token: string): any | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as any;
  }


  ///////////////Session///////////////////
  isAuthenticated(): boolean {
    if (this.AuthToken != null) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem(environment.TOKEN_NAME);
    this.router.navigate(['login']);
  }
  refreshSession(): any {
    this._isLoggedIn$.next(!!this.AuthToken);
  }

  //////Roles//////
  get UserRoles(): any[] {
    return this.getUser(this.AuthToken).roles;
  }
  hasRoles(roles: Rol[]) {
    console.warn('Has roles', this.UserRoles);
    return this.UserRoles && roles.some((r) => this.UserRoles.includes(r));
  }
  //////ToKen//////
  get AuthToken(): string {
    return localStorage.getItem(environment.TOKEN_NAME);
  }

  setAuthToken(tokenValue: string) {
    localStorage.setItem(environment.TOKEN_NAME, tokenValue);
  }
}
