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
    // this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    // console.log("DATA"+ this.loginUsuario);
    // this.authService.login(this.loginUsuario).subscribe(
    //   data => {
    //     this.isLogged = true;
    //     this.tokenService.setToken(data.token);
    //     this.tokenService.setAuthorities(data.authorities);
    //     this.roles = data.authorities;
    //     // this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
    //     //   timeOut: 3000, positionClass: 'toast-top-center'
    //     // });
    //    this.router.navigate(['#']);
    //   },
    //   err => {
    //     this.isLogged = false;
    //     this.errMsj = err.error.message;
       
    //     console.log(err.error.message);
    //   }
    // );
    // console.log("DATOS "+this.password,this.nombreUsuario,this.isLogged);
    
      this.router.navigate(['#']);
  }


}
