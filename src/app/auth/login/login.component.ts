import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'app/models/login-usuario';
import { AuthService } from 'app/service/auth.service';
import { TokenService } from 'app/service/token.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
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
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        const token = {
          token: data.token,
          date: new Date().toString()
        };
        try {
          // this.fbstore.collection('tokens').add(token).then(data => {
          // });
        } catch (err) {
          console.log(err.error.message);
        }
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error.message;
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Error al ingresar, credenciales incorrectas.',
        //   life: 3000,
        // });
      }
    );
  }


}
