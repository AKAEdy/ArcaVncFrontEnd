import { Component, OnInit, ViewChild } from '@angular/core';

import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';
import { environment } from 'environments/environment';
const basePath = environment.basePath + "/animales";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {


 
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