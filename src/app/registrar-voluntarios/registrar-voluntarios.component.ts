import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from 'app/api/voluntarios.service';
import { Voluntario } from 'app/model/voluntario';
import { VoluntarioDto } from 'app/model/voluntarioDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-voluntarios',
  templateUrl: './registrar-voluntarios.component.html',
  styleUrls: ['./registrar-voluntarios.component.css']
})
export class RegistrarVoluntariosComponent implements OnInit {
voluntarios:VoluntarioDto = {
  actividad: '',
  apellidos: '',
  cedula: '',
  celular: '',
  correo: '',
  direccion: '',
  nombre: '',
  telefono: '',
  tipo: ''
}
  constructor(private voluntarioService:VoluntariosService) { }

  ngOnInit(): void {
  }

  createVoluntarios(){
    console.log("DATOSS "+this.voluntarios.cedula);
    
    if(this.voluntarios.cedula === undefined || this.voluntarios.actividad === undefined || this.voluntarios.nombre === undefined
    || this.voluntarios.apellidos === undefined || this.voluntarios.telefono === undefined || this.voluntarios.celular === undefined
    || this.voluntarios.correo === undefined || this.voluntarios.direccion === undefined || this.voluntarios.tipo === undefined
    || this.voluntarios.cedula === '' || this.voluntarios.actividad=== '' || this.voluntarios.nombre === ''
    || this.voluntarios.apellidos === '' || this.voluntarios.telefono === ''|| this.voluntarios.celular === ''
    || this.voluntarios.correo === '' || this.voluntarios.direccion === ''  || this.voluntarios.tipo === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos!',
      })
    } else {
      Swal.fire({
        title: 'Seguro quiere realizar esta acción?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.voluntarioService.createUsingPOST10(this.voluntarios).subscribe(data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Voluntario registrado exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
                     });
                     
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }
    
       
      }

}
