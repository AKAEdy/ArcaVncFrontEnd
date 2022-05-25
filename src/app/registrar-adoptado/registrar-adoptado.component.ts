import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
import { Animal } from 'app/model/animal';


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
    
    this.adopcionesService.crearAdocionUsingPOST(this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion).subscribe(data =>{
      console.log("LOS DATOS"+data);
      
    })
  }

}
