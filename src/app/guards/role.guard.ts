import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (route.data.roles && !this.authService.hasRoles(route.data.roles)) {
        this.router.navigateByUrl('/menu');
        Swal.fire(
          'Acceso denegado',
          `No tienes acceso a este recurso!`,
          'warning'
        );
        return false;
      }
      return true;
    }
}
