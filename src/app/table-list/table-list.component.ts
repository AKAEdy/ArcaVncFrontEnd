import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { AnimalesRefugioService } from 'app/api/animalesRefugio.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { Animal } from 'app/model/animal';

import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
import { FichaClinica } from 'app/model/fichaClinica';
import { FichaClinicaDTO } from 'app/model/fichaClinicaDTO';
import { environment } from 'environments/environment';
import { data } from 'jquery';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
filterAnimal:any='';
dataSource:any={};

  //VARIABLE DE animal
  public animales: AnimalRefugioResponse[] = [];
  //fc
  public fichasClinicas: FichaClinicaDTO[] = [];
  pagina=0;
  tamaño=8;
  // router: any;
  constructor(private animalesService: AnimalesRefugioService,private router: Router,private fichasClinicasService: FichasClnicasService) { }

  ngOnInit(): void {
    this.filterAnimal=this.animales;
    this.listarAnimales();
  this.pagina = 0;
  }

  

  
eliminarAnimal(id: number) {
  Swal.fire({
    title: '¿Esta seguro que decea eliminar?',
    text: "No podra revertir los cambios!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FE3838',
    cancelButtonColor: '#878787',
    confirmButtonText: 'Si, eliminar!',
   
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Registro eliminado exitosamente.',
        'success'
      )
      
     this.animalesService.eliminarAnimalUsingDELETE(id).subscribe(data => {
      
    })
    this.irAtras();
  
  }
    else if (result.isDenied) {
      Swal.fire('Acción cancelada', '', 'info')
    }

  })
  }


 
 
 irAtras(){
  this.router.navigate(['/table-list']);
 }
 
Detalle(id: number){

  this.animalesService.getAnimalPorIdUsingGET(id).subscribe(data =>{
      this.animales=data;
    console.log("listado detalle", data);
    this.router.navigate (['/upgrade', id]);
    });
  }

  listarAnimales(){
    
this.animalesService.getAnimalesNoAdoptadosUsingGET(this.pagina,this.tamaño).subscribe(data =>{
       this.animales = data.animales;
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