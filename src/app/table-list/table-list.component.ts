import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';
import { environment } from 'environments/environment';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
filterpost:any='';
dataSource:any={};

  //VARIABLE DE animal
  public animales: Animal[] = [];
  pagina=0;
  tamaño=8;
  // router: any;
  constructor(private animalesService: AnimalesService,private router: Router) { }

  ngOnInit(): void {
    this.filterpost=this.animales;
    this.listarAnimales();
  this.pagina = 0;
    // this.getAnimalesPage(
    //   this.paginaActual.toString(),
    //   this.totalPorPagina.toString(),
    //   this.busqueda
    // );
  }


  Detalle(id: number){
    this.animalesService.getByIdUsingGET(id).subscribe(data =>{
      this.animales=data;
    console.log("listado",data);
    this.router.navigate (['/upgrade', id]);
    });
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