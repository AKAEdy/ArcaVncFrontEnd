import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { AnimalesService } from 'app/api/animales.service';
import { Adopcion } from 'app/model/adopcion';
import { Animal } from 'app/model/animal';

@Component({
  selector: 'lista-adoptado',
  templateUrl: './lista-adoptado.component.html',
  styleUrls: ['./lista-adoptado.component.css']
})
export class ListaAdoptadoComponent implements OnInit {
 
  //VARIABLE DE animal
  public animales: Animal[] = [];
  pagina=0;
  tamaño=2;
  constructor(private animalesService: AnimalesService) { }

  ngOnInit(): void {
    this.listarAnimales();
  this.pagina = 0;
    // this.getAnimalesPage(
    //   this.paginaActual.toString(),
    //   this.totalPorPagina.toString(),
    //   this.busqueda
    // );
  }
  listarAnimales(){

    this.animalesService.getAnimalsUsingGET(this.pagina,this.tamaño).subscribe(data =>{
       this.animales = data.content
       console.log ("listado", data)
    })
  }

  next(){
    this.pagina = this.pagina + 1;
  console.log(this.pagina);
  this.listarAnimales();
  }

  previous(){

    this.pagina = this.pagina - 1;
    if(this.pagina < 0){
      this.pagina = 0;
    }

    this.listarAnimales();
    console.log(this.pagina);

  }

}