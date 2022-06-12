import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { AdoptanteControllerService } from 'app/api/adoptanteController.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
import { AdoptanteDto } from 'app/model/adoptanteDto';
import { Animal } from 'app/model/animal';
import Swal from 'sweetalert2';


@Component({
  selector: 'registrar-adoptado',
  templateUrl: './registrar-adoptado.component.html',
  styleUrls: ['./registrar-adoptado.component.css']
})
export class RegistrarAdoptadoComponent implements OnInit {
  adopcion: Adopcion = {};
 adoptante: Adoptante = {};
 adoptantes: Adoptante[]=[];
 animal: Animal={
   colorCaracteristicas: '',
   edad: 0,
   especie: '',
   fechaNacimiento: undefined,
   foto: '',
   lugarEstancia: '',
   nombre: '',
   observacionesProcedencia: '',
   peso: 0,
   procedencia: '',
   raza: '',
   sexo: '',
   tamanyo: ''
 };
 cedulas: string;
  constructor(private adopcionesService:AdopcionControllerService, private adoptanteService: AdoptanteControllerService) {
 
  }


  ngOnInit(): void {
  }

  saveAdopciones(){
    console.log("LLEGA "+ this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion);
    
    if(this.adoptante.id ===  undefined || this.animal.id === undefined || this.adopcion.descripcion === undefined || this.adopcion.descripcion === "" || this.adopcion.fechaAdopcion === ""  || this.adopcion.fechaAdopcion === undefined){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos!',
      })
    } else{
      Swal.fire({
        title: 'Seguro quiere realizar esta accion??',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.adopcionesService.crearAdocionUsingPOST(this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion).subscribe(data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se a adoptado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          })
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      }) 
    }
  }

  getCedulaAdoptante(cedula: string){
    this.adoptanteService.getAdoptantePorCedulaUsingGET(cedula).subscribe(data =>{
this.adoptantes = data
// for (let index = 0; index < this.adoptantes.length; index++) {
//   var element = this.adoptantes[index];
  
// }
window.alert("EDITAR "+ data);

    })
  }
}
