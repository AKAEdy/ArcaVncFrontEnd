import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from 'app/api/voluntarios.service';
import { Voluntario } from 'app/model/voluntario';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-voluntarios',
  templateUrl: './registrar-voluntarios.component.html',
  styleUrls: ['./registrar-voluntarios.component.css']
})
export class RegistrarVoluntariosComponent implements OnInit {
voluntarios:Voluntario ={
  actividad: '',
 
  persona: {
  apellidos: '',
    cedula: '',
    celular: '',
    correo: '',
    direccion: '',
    
    nombre: '',
    telefono: ''
  },
  tipo: ''
}
  constructor(private voluntarioService:VoluntariosService) { }

  ngOnInit(): void {
  }

  createVoluntarios(){
    console.log("DATOSS "+this.voluntarios.persona.cedula);
    
    if (this.voluntarios.persona.cedula === undefined || this.voluntarios.actividad === undefined || this.voluntarios.persona.nombre === undefined
    || this.voluntarios.persona.apellidos === undefined || this.voluntarios.persona.telefono === undefined || this.voluntarios.persona.celular === undefined
    || this.voluntarios.persona.correo === undefined || this.voluntarios.persona.direccion === undefined || this.voluntarios.tipo === undefined
    || this.voluntarios.persona.cedula === '' || this.voluntarios.actividad=== '' || this.voluntarios.persona.nombre === ''
    || this.voluntarios.persona.apellidos === '' || this.voluntarios.persona.telefono === ''|| this.voluntarios.persona.celular === ''
    || this.voluntarios.persona.correo === '' || this.voluntarios.persona.direccion === ''  || this.voluntarios.tipo === '') {
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
          this.voluntarioService.createUsingPOST9(this.voluntarios).subscribe(data =>{
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
