import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'app/models/nuevo-usuario';
import { Rol } from 'app/models/rol';
import { AuthService } from 'app/service/auth.service';
import { TokenService } from 'app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario={
    password: '',
    username: '',
    roles: new Rol,
    registro: function (): void {
      throw new Error('Function not implemented.');
    }
  };
  
  password1: string;
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  //  private toastr: ToastrService
  ) {
    this.nuevoUsuario.roles.nombre='';
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
   
    
  if (this.password1 === this.nuevoUsuario.password) { 
    console.log("datooo   "+this.nuevoUsuario.password,this.nuevoUsuario.roles.nombre, this.nuevoUsuario.username);

    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La cuenta '+ this.nuevoUsuario.username + ' a sido creada!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Campos incorrectos!',
        })
      }
    );
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden!',
    })
  }
  
  }

}
