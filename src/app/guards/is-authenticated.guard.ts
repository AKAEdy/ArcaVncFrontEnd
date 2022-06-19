import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
	providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

	constructor (private authService: AuthService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		this.authService.refreshSession();
		return this.authService.isLoggedIn$.pipe(tap((isLogged) => {
			!isLogged ? this.router.navigate([ '/login' ], { queryParams: { redirectUrl: state.url } }) : null;
			!isLogged ? Swal.fire({
				timer: 3000,
				title: 'Por favor vuelve a iniciar sesión',
				toast: true,
				icon: 'info',
				position: 'top-end',
				showConfirmButton: false,
				showClass: {
					popup: 'animate__animated animate__bounceInRight'
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutRight'
				}
			}) : null;
		}));

	}
}
