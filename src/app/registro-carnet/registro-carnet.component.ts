import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimalesRefugioService } from 'app/api/animalesRefugio.service';
import { CarnetsDeVacunacinService } from 'app/api/carnetsDeVacunacin.service';
import { VacunasService } from 'app/api/vacunas.service';

import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
import { CarnetVacunacion } from 'app/model/carnetVacunacion';
import { Vacuna } from 'app/model/vacuna';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro-carnet',
  templateUrl: './registro-carnet.component.html',
  styleUrls: ['./registro-carnet.component.css']
})
export class RegistroCarnetComponent implements OnInit {
  animal: AnimalRefugioResponse={};
 selectedvacunas: Vacuna={};
 vacunas: Vacuna[] = [];
  carnetVacuna: CarnetVacunacion={};
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesRefugioService, private carnetVacunacion: CarnetsDeVacunacinService, private vacuna: VacunasService) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.params.id;
    this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
      this.animal= data.animal;
      console.log(data,"datos de animal")
    },
      err => {
        
      }
    );
  this.getAllVacunas();
  }
    
    
      

     guardarCarnet(){

      // console.log("LLEGA "+ this.animal.id,this.animal.nombre,this.animal.sexo, this.animal.especie, this.animal.procedencia, this.animal.lugarEstancia, this.animal.raza, this.animal.peso, this.animal.edad, this.animal.tamanyo, this.animal.fechaNacimiento, this.animal.colorCaracteristicas, this.animal.observacionesProcedencia, this.animal.foto);
       
      console.log(this.selectedvacunas,"imprimiendo selectedvacunas")
          /* igualando de id de animal pasar por routerlink */
         this.carnetVacuna.animal=this.animal as AnimalRefugioResponse;
      this.carnetVacuna.vacuna=this.selectedvacunas;
        //  console.log(this.vacuna,"mostrar objeto vacuna");
        // console.log(JSON.stringify(this.selectedvacunas),"imprimiendo objeto convertido");
         console.log(this.carnetVacuna);
            this.carnetVacunacion.createUsingPOST(this.carnetVacuna).subscribe(data =>{
           
              this.carnetVacuna=data;
              console.log(data , "guardando carnet")
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se a registrado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              ;
              
              location.reload();
            });
           
          }
            
         
          getAllVacunas(){
            this.vacuna.getVacunasUsingGET().subscribe(data =>
              {
                this.vacunas = data;
                console.log(data);
                
              })
          }
          irAtras(){
            this.router.navigate(['/upgrade', this.animal.id]);
          }
        
      }
    
  


