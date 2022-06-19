import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from 'app/models/login-response';
import { LoginUsuario } from 'app/models/login-usuario';
import { Rol } from 'app/models/rol';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface ROL {
	nombre: string;
}
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
	isLoggedIn$ = this._isLoggedIn$.asObservable();


	constructor (private httpClient: HttpClient, private router: Router, private activateRouted: ActivatedRoute) { }

	public login(loginUsuario: LoginUsuario): Observable<any> {
		return this.httpClient.post<LoginUsuario>(environment.AUTH_URL + 'login', loginUsuario).pipe(tap((loginResponse: LoginResponse) => {
			this._isLoggedIn$.next(true);
			this.setAuthToken(loginResponse.token.tokenValue);
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
	clearLocalStorage() {
		localStorage.removeItem(environment.TOKEN_NAME);
	}
	logout(hasRedirectUrl?: boolean) {
		!hasRedirectUrl ? this.router.navigate([ 'login' ]) : null;
		this.clearLocalStorage()
	}
	refreshSession(): any {
		this._isLoggedIn$.next(this.isAuthenticated());
	}

	//////Roles//////
	get UserRoles(): any[] {
		try {
			return this.getUser(this.AuthToken).roles;
		} catch (e) {
			this.showToast('Algo salio mal', 'error', 'login')
		}
	}
	hasRoles(roles: Rol[]) {
		// console.warn('Has roles', this.UserRoles);
		return this.UserRoles && roles.some((r) => this.UserRoles.includes(r));
	}
	//////ToKen//////
	get AuthToken(): string {
		return localStorage.getItem(environment.TOKEN_NAME) || null;
	}
	setAuthToken(tokenValue: string) {
		localStorage.setItem(environment.TOKEN_NAME, tokenValue);
	}
	/**
	 *
	 *
	 * @public
	 * @param {*} errorMessage
	 * @param {SweetAlertIcon} icon
	 * @param {*} [urlToNavigate]
	 * @param {string} [description]
	 * @memberof AuthService
	 */
	public showToast(errorMessage: any, icon: SweetAlertIcon, urlToNavigate?: any, description?: string) {
		urlToNavigate ? this.router.navigate([ urlToNavigate ]) : null;
		Swal.fire({
			timer: 3000,
			title: errorMessage,
			text: description,
			toast: true,
			icon: icon,
			position: 'top-end',
			showConfirmButton: false,
			showClass: {
				popup: 'animate__animated animate__bounceInRight'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutRight'
			}
		});
	}
}
