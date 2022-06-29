import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { CarnetsDeVacunacinService } from 'app/api/carnetsDeVacunacin.service';
import { Animal } from 'app/model/animal';
import { CarnetVacunacion } from 'app/model/carnetVacunacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro-carnet',
  templateUrl: './registro-carnet.component.html',
  styleUrls: ['./registro-carnet.component.css']
})
export class RegistroCarnetComponent implements OnInit {
  animal: Animal={};

  carnetVacuna: CarnetVacunacion={};
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesService, private carnetVacunacion: CarnetsDeVacunacinService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.es.getByIdUsingGET(id).subscribe(data =>{
      this.animal= data;
      console.log(data,"data de animal");
   
    },
      err => {
       
      }
    );}

  

    guardarCarnet(){

      // console.log("LLEGA "+ this.animal.id,this.animal.nombre,this.animal.sexo, this.animal.especie, this.animal.procedencia, this.animal.lugarEstancia, this.animal.raza, this.animal.peso, this.animal.edad, this.animal.tamanyo, this.animal.fechaNacimiento, this.animal.colorCaracteristicas, this.animal.observacionesProcedencia, this.animal.foto);
        
      
          /* Read more about isConfirmed, isDenied below */
         this.carnetVacuna.animal=this.animal as Animal;
         console.log(this.carnetVacuna);
         
            this.carnetVacunacion.createUsingPOST1(this.carnetVacuna).subscribe(data =>{
              this.carnetVacuna=data;
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
          
      
    
  }


