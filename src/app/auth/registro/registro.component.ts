import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'app/models/nuevo-usuario';
import { AuthService } from 'app/service/auth.service';
import { TokenService } from 'app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
  password: string;
  telefono:string;
  roles:string[];
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  //  private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    console.log("datooo   "+this.roles);
    
  if (this.password1 === this.password2) {
    this.password = this.password1;
    
    this.nuevoUsuario = new NuevoUsuario(this.email,this.password, this.nombre, this.username, this.telefono, this.roles);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
   //     this.toastr.success('Cuenta Creada', 'OK', {
      //    timeOut: 3000, positionClass: 'toast-top-center'
        //});

        this.router.navigate(['/login']); 
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La cuenta '+ this.username + ' a sido creada!',
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
