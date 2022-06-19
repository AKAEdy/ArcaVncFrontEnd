import {
	HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { TokenService } from 'app/service/token.service';
import { catchError, Observable, throwError } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor (private router: Router, private authService: AuthService, private tokenService: TokenService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		const token: string | null = this.authService.AuthToken;
		let req = request;
		request = token ? req.clone({
			setHeaders: {
				authorization: `Bearer ${ token }`
			}
		}) : request;
		return next.handle(request).pipe(
			catchError((e: any) => {
				if (e.status === 403) {
					let icon: SweetAlertIcon = 'error';
					const errorMessage = e.error.errors.find(error => {
						if (error.includes('cuenta')) {
							this.authService.logout();
							return error;
						} else if (error.includes('expirado')) {
							icon = 'info'
							this.authService.logout(true);
							return this.router.navigate([ 'login' ], {
								queryParams: {
									redirectUrl: location.hash.split('#/')[ 1 ]
								}
							});
						} else {
							this.authService.logout();
						}
					});
					this.showToast(errorMessage, icon);
				}
				if (e.status === 401) {
					console.log('Interceptor - Logged?', this.authService.isAuthenticated());
					if (this.authService.isAuthenticated()) {
						this.showToast(e.error.errors[ 0 ], 'error', 'menu')
					} else {
						this.authService.logout();
					}
				}
				return throwError(() => e);
			})
		);
	}
	/**
	 *
	 *
	 * @private
	 * @param {*} errorMessage
	 * @param {SweetAlertIcon} icon
	 * @param {*} [urlNavigate]
	 * @memberof AuthInterceptor
	 */
	private showToast(errorMessage: any, icon: SweetAlertIcon, urlToNavigate?: any) {
		urlToNavigate ? this.router.navigate([ urlToNavigate ]) : null;
		Swal.fire({
			timer: 3000,
			title: errorMessage,
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
