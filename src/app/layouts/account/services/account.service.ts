import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ProfileDto } from '../interfaces/profile-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  updateProfile(profile: ProfileDto, id: number): Observable<any> {
    return this.http.put<ProfileDto>(`${environment.BASE_URL}usuarios/profile/${id}`, profile).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.status == 500) {
          return throwError(() => e.error.errors);
        }
        console.error(e);
        
        Swal.fire(e.error.mensaje, e.error.errors, "error");
        return throwError(() => e);
      })
    );
  }
}
