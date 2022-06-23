import { Component, OnInit } from '@angular/core';
import { AdoptantesService } from 'app/api/adoptantes.service';
import { AdoptanteDto } from 'app/model/adoptanteDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-adoptante',
  templateUrl: './registrar-adoptante.component.html',
  styleUrls: ['./registrar-adoptante.component.css']
})
export class RegistrarAdoptanteComponent implements OnInit {
adoptantes: AdoptanteDto={}
  constructor(private adoptanteService: AdoptantesService)  { }

  ngOnInit(): void {
  }

  createAdoptante(){
    if (this.adoptantes.cedula === undefined || this.adoptantes.nombre === undefined || this.adoptantes.apellidos === undefined
      || this.adoptantes.correo === undefined || this.adoptantes.telefono === undefined || this.adoptantes.celular === undefined
      || this.adoptantes.telefonoFamiliar === undefined || this.adoptantes.nicknameFacebook === undefined
      || this.adoptantes.direccion === undefined || this.adoptantes.cedula === "" || this.adoptantes.nombre === "" ||
      this.adoptantes.apellidos === "" || this.adoptantes.correo === "" || this.adoptantes.telefono === "" || this.adoptantes.celular === ""
      || this.adoptantes.direccion === ""  || this.adoptantes.telefonoFamiliar === ""  || this.adoptantes.nicknameFacebook === "") {
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
          this.adoptanteService.crearAdoptanteUsingPOST(this.adoptantes).subscribe(data =>{
            this.adoptantes = data
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Adoptante registrado exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          },err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cédula o correo electronico ya registrado!',
            })
          })  
        }
        else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }
   
  }

}
