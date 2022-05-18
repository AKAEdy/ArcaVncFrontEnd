import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido! '+ this.username,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['#']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas!',
        })
      }
    );
  }


}
