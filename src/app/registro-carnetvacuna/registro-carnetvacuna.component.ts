import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Vacuna } from 'app/model/vacuna';
import { CarnetVacunacion } from 'app/model/carnetVacunacion';

import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';
import { VacunasService } from 'app/api/vacunas.service';
import Swal from 'sweetalert2';
import { CarnetVacunasService } from 'app/api/carnetvacuna.service';
import { Router } from '@angular/router';


@Component({
  selector: 'registro-carnetvacuna',
  templateUrl: './registro-carnetvacuna.component.html',
  styleUrls: ['./registro-carnetvacuna.component.css']
})

export class RegistroCarnetvacunaComponent implements OnInit {


  filterpost:any='';
  dataSource:any={};

  //VARIABLE DE animal
  public animales: Animal[] = [];
  animal: Animal={};
  carnetv: CarnetVacunacion = {};
  public carnetvacunas: CarnetVacunacion [] = [];
  pagina=0;
  tamaño=8;
  id:number;
  public vacunas: Vacuna[] = [];


  constructor(private vacunaService: VacunasService, private carnetvacunaservice: CarnetVacunasService, private animalesService: AnimalesService, private router: Router) { }

  ngOnInit(): void {
  }
}
    //this.filterpost=this.animales;
    //this.listarVacunas();
    //this.pagina = 0;
    //this.getAllVacunas();
    

 /* idAnimal:number;
  animal:any={};

  constructor(private router: Router) { 
    this.animal={};

  }

  ngOnInit(): void {
    this.animal = JSON.parse(localStorage.getItem('animal'));
  }

  getAllVacunas(){
    this.vacunaService.getVacunasUsingGET().subscribe(date =>
      {
        this.vacunas = date;
        console.log(this.vacunas[0]);
        
      })
  }

  listarVacunas(){

    this.vacunaService.getVacunasUsingGET().subscribe(data =>{
       this.vacunas = data;
       console.log ("listado", data)
    })
  }

  savecarnetvacuna(){

    if( this.carnetv.fechaAplicacion === undefined  || this.carnetv.fechaProximaAplicacion === undefined || this.carnetv.vacuna === undefined ){
  
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
        /*
        if (result.isConfirmed) {
          this.carnetvacunaservice.createcarnetvacunaUsingPOST(this.carnetv).subscribe(data =>{
            this.animal=data;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se a registrado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            // almaceno los datos del animal para enviar a ficha clinica
            localStorage.setItem('carnetv', JSON.stringify(this.carnetv));
            // console.log('imprimiendo valores de la data',);
            
            location.reload();
          });
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      }) 
    }

  }

  
  irAtras() {
   this.router.navigateByUrl("/menu");
   localStorage.removeItem('carnetv');
 }
 */


