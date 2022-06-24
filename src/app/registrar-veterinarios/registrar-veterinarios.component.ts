import { Component, OnInit } from '@angular/core';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { Veterinario } from 'app/model/veterinario';
import { errorMonitor } from 'events';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-veterinarios',
  templateUrl: './registrar-veterinarios.component.html',
  styleUrls: ['./registrar-veterinarios.component.css']
})
export class RegistrarVeterinariosComponent implements OnInit {
 veterinarios:Veterinario={
  cargo: '',
  id: 0,
  persona: {
    apellidos: '',
    cedula: '',
    celular: '',
    correo: '',
    direccion: '',
    id: 0,
    nombre: '',
    telefono: ''
  }
 };
 cargo:string
  constructor(private veterinarioService: VeterinariosService) { 
    // this.veterinarios.cargo 
    // this.veterinarios.persona = {} 
  }

  ngOnInit(): void {
    location.reload
  } 
  createVeterinarios(){
if (this.veterinarios.persona.cedula === undefined || this.veterinarios.cargo === undefined || this.veterinarios.persona.nombre === undefined
|| this.veterinarios.persona.apellidos === undefined || this.veterinarios.persona.telefono === undefined || this.veterinarios.persona.celular === undefined
|| this.veterinarios.persona.correo === undefined || this.veterinarios.persona.direccion === undefined
|| this.veterinarios.persona.cedula === '' || this.veterinarios.cargo === '' || this.veterinarios.persona.nombre === ''
|| this.veterinarios.persona.apellidos === '' || this.veterinarios.persona.telefono === ''|| this.veterinarios.persona.celular === ''
|| this.veterinarios.persona.correo === '' || this.veterinarios.persona.direccion === '') {
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
      this.veterinarioService.createUsingPOST9(this.veterinarios).subscribe(data =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Veterinario registrado exitosamente',
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
