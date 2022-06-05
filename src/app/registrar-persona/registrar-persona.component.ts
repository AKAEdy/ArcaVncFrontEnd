import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'app/api/personas.service';
import { Persona } from 'app/model/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.css']
})
export class RegistrarPersonaComponent implements OnInit {

  persona: Persona = {}
  constructor(private personaService: PersonasService) { }

  ngOnInit(): void {
  }

  createPersonas() {
    if (this.persona.cedula === undefined || this.persona.nombre === undefined || this.persona.apellidos === undefined
      || this.persona.correo === undefined || this.persona.telefono === undefined || this.persona.celular === undefined
      || this.persona.direccion === undefined || this.persona.cedula === "" || this.persona.nombre === "" ||
      this.persona.apellidos === "" || this.persona.correo === "" || this.persona.telefono === "" || this.persona.celular === ""
      || this.persona.direccion === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese todos los datos!',
      })
    } else {
      Swal.fire({
        title: 'Seguro quiererealizar esta acción?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.personaService.createUsingPOST3(this.persona).subscribe(data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Persona registrada exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          })         
        }
        else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }

  }
}