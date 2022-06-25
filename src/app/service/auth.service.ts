import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'app/model/persona';
import { LoginResponse } from 'app/models/login-response';
import { LoginUsuario } from 'app/models/login-usuario';
import { Rol } from 'app/models/rol';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface ROL {
	nombre: string;
}
export interface CurrentUser {
	id?: number;
	username?: string
	persona?: Persona;
}
@Injectable({
	providedIn: 'root'
})
export class AuthService implements OnDestroy {

	private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _user$: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>({});

	public get isLoggedIn$(): Observable<boolean> {
		return this._isLoggedIn$.asObservable();
	}
	public get currentUser$(): Observable<CurrentUser> {
		return this._user$.asObservable();
	}
	public ngOnDestroy(): void {
		this._isLoggedIn$.next(false);
		this._isLoggedIn$.complete();
		this._user$.next({});
		this._user$.complete();
	}
	constructor (private httpClient: HttpClient, private router: Router, private activateRouted: ActivatedRoute) { }

	public login(loginUsuario: LoginUsuario): Observable<any> {
		return this.httpClient.post<LoginUsuario>(environment.AUTH_URL + 'login', loginUsuario).pipe(tap((loginResponse: LoginResponse) => {
			this.setCurrentUser({ username: loginResponse.username, id: loginResponse.id, persona: loginResponse.persona }, loginResponse.token.tokenValue);
			this.router.navigate([ this.activateRouted.snapshot.queryParamMap.get('redirectUrl') || '#' ]);
		}
		), catchError((e) => {
			console.log('BEEEP ERROR!')
			return throwError(e);
		}
		)
		);
	}

	private getUserRoles(token: string): any | null {
		if (!token) {
			return null
		}
		return JSON.parse(atob(token.split('.')[ 1 ])) as any;
	}
	private getCurrentUser(user: string): CurrentUser | null {
		if (!user) {
			return null
		}
		return JSON.parse(user) as CurrentUser;
	}

	///////////////Session///////////////////
	isAuthenticated(): boolean {
		return !!this.AuthToken;
	}
	isUser(): CurrentUser {
		return this.UserProfile ?? {};
	}
	clearLocalStorage() {
		localStorage.removeItem(environment.TOKEN_NAME);
		localStorage.removeItem(environment.USER_VALUE);
	}
	logout(hasRedirectUrl?: boolean) {
		!hasRedirectUrl ? this.router.navigate([ 'login' ]) : null;
		this.clearLocalStorage()
		this._isLoggedIn$.next(false);
	}
	refreshSession(): any {
		this.isAuthenticated() ?? this._user$.next(this.isUser())
		this._isLoggedIn$.next(this.isAuthenticated());
	}

	//////Roles//////
	get UserRoles(): any[] {
		try {
			return this.getUserRoles(this.AuthToken).roles;
		} catch (e) {
			this.showToast('Algo salio mal', 'error', 'login')
			this.logout()
		}
	}
	get UserProfile(): CurrentUser {
		try {
			return this.getCurrentUser(this.CurrentUser);
		} catch (e) {
			this.showToast('Algo salio mal', 'error', 'login')
			this.logout()
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
	get CurrentUser(): string {
		return localStorage.getItem(environment.USER_VALUE) || null;
	}

	setCurrentUser(current: CurrentUser, tokenValue: string) {
		this._isLoggedIn$.next(true);
		this._user$.next(current);
		localStorage.setItem(environment.TOKEN_NAME, tokenValue);
		localStorage.setItem(environment.USER_VALUE, JSON.stringify(current));
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