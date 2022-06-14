import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'app/models/login-response';
import { LoginUsuario } from 'app/models/login-usuario';
import { NuevoUsuario } from 'app/models/nuevo-usuario';
import { Rol } from 'app/models/rol';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
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


	constructor(private httpClient: HttpClient, private router: Router, private activateRouted: ActivatedRoute) { }

	public login(loginUsuario: LoginUsuario): Observable<any> {
		return this.httpClient.post<LoginUsuario>(environment.AUTH_URL + 'login', loginUsuario).pipe(tap((loginResponse: LoginResponse) => {

			this.setAuthToken(loginResponse.token.tokenValue);
			this._isLoggedIn$.next(true);
			console.log(this.redirectUrl);

			this.router.navigate([ this.activateRouted.snapshot.queryParamMap.get('redirectUrl') || '#' ]);
		}
		), catchError((e) => {
			console.log('BEEEP ERROR!')
			return throwError(e);
		}
		)
		);
	}

	private getUser(token: string): any | null {
		if (!token) {
			return null
		}
		return JSON.parse(atob(token.split('.')[ 1 ])) as any;
	}


	///////////////Session///////////////////
	isAuthenticated(): boolean {
		return !!this.AuthToken;
	}
	logout() {
		this.redirectUrl = '';
		localStorage.removeItem(environment.TOKEN_NAME);
		this.router.navigate([ 'login' ]);
	}
	refreshSession(): any {
		this._isLoggedIn$.next(this.isAuthenticated());
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
export enum ROLES {
	ROLE_ADMIN = "ROLE_ADMIN",
	ROLE_DEFAULT_USER = "ROLE_DEFAULT_USER",
	ROLE_VETERINARIO = "ROLE_VETERINARIO",
}
export const ROLES_POR_MODULOS = {
	MODULO_ANIMALES: [ ROLES.ROLE_ADMIN, ROLES.ROLE_VETERINARIO ],
	MODULO_ADOPCIONES: [ ROLES.ROLE_ADMIN, ROLES.ROLE_VETERINARIO, ROLES.ROLE_DEFAULT_USER ],
	MODULO_PERSONAS: [ ROLES.ROLE_ADMIN ]
};