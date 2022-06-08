import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
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
 animal: Animal={};
  constructor(private adopcionesService:AdopcionControllerService) {
 
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
            console.log("LOS DATOS"+data);
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

}
