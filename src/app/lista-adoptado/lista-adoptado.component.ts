import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { Adopcion } from 'app/model/adopcion';

@Component({
  selector: 'lista-adoptado',
  templateUrl: './lista-adoptado.component.html',
  styleUrls: ['./lista-adoptado.component.css']
})
export class ListaAdoptadoComponent implements OnInit {

  adopcion:Adopcion[]=[];
  constructor(private adopcionService: AdopcionControllerService) { }

  ngOnInit(): void {
    this.getAllAdopcion();
  }

  getAllAdopcion(){
    this.adopcionService.getAllAdopcionesUsingGET().subscribe(data=>{
      this.adopcion = data;
     console.log("ADOPCION "+ this.adopcion);
     
    })
}
}