import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public showPassword: boolean = false;

  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  errorMessage: string;

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('loginUsuario');
  }
  public showPass(): void {
    this.showPassword = !this.showPassword;
  }
  onLogin(f: NgForm): void {
    this.errorMessage = '';
    this.loginUsuario = f.value
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
        localStorage.setItem('loginUsuario', JSON.stringify(data));
      },
      err => {
        console.warn("code", err);
        if (err.error.code === 401) {
          this.errorMessage = err.error.message
        }
        else if (err.error.code === 400) {
          if (err.error.errors.length === 1) {
            this.errorMessage = err.error.errors
          }
        }
      }
    );
  }


}
