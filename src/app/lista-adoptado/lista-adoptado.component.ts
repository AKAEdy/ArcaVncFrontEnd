import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { Adopcion } from 'app/model/adopcion';

@Component({
  selector: 'lista-adoptado',
  templateUrl: './lista-adoptado.component.html',
  styleUrls: ['./lista-adoptado.component.css']
})
export class ListaAdoptadoComponent implements OnInit {
  filterpost:any='';
  adopcion:Adopcion[]=[];
  dataSource: any ={};
  constructor(private adopcionService: AdopcionControllerService) { }

  ngOnInit(): void {
    this.getAllAdopcion();
    this.filterpost=this.adopcion;
  }

  getAllAdopcion(){
    this.adopcionService.getAllAdopcionesUsingGET().subscribe(data=>{
      this.adopcion = data;
    })
    
}

// filtrar(event: Event) {
//   for (let index = 0; index < this.adopcion.length; index++) {
//   this.dataSource = this.adopcion[index];
    
//     const filtro = (event.target as HTMLInputElement).value;
//     if(this.dataSource.adoptante.persona.nombre.toLowerCase().includes(filtro.trim().toLowerCase())){
//       console.log(this.dataSource.adoptante.persona.nombre);
//       (this.dataSource.adoptante.persona.nombre)
//     }
//   }
// }  
}