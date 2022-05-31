import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'app/interceptors/auth.interceptor';
import { LoginUsuario } from 'app/models/login-usuario';
import { AuthService } from 'app/service/auth.service';
import { TokenService } from 'app/service/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: LoginUsuario;
  username: string;
  password: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario("admin", "admin");
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        })
        Toast.fire({
          icon: 'success',
          title: `Bienvenido ${data.username}`
        })
      },
      err => {
        console.warn(err);
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas!',
        })
      }
    );
  }


}
