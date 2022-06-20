import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';

import { FichaClinica } from 'app/model/fichaClinica';
import { Veterinario } from 'app/model/veterinario';
import Swal from 'sweetalert2';

@Component({
  selector: 'ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {
  
  //animal: Animal={}
//veterinario: Veterinario={};
fichaClinica: FichaClinica={};
animal:any={}
public formSubmitted = false;
  constructor(private fichasClinicasService: FichasClnicasService,private router: Router,private _formBuilder: FormBuilder) {
  
    this.animal={};
    

   }

  ngOnInit(): void {
    this.animal = JSON.parse(localStorage.getItem('animal'));
    console.log("recibiendo información de animal con localstorage",this.animal);
  }

  guardar(){
      
       this.fichasClinicasService.createUsingPOST1(this.fichaClinica).subscribe(data =>{
       console.log("LOS DATOS"+data);
          Swal.fire({
          position: 'center',
           icon: 'success',
            title: 'Se a adoptado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }

      
    
   }
  

    // guardarFicha(form: NgForm) {
    //   this.formSubmitted = true;
    //   if (form.invalid) {
    //     return;
    //   } 
    //   if (this.fichaClinica.id) {
    //     this.fichasClinicasService
    //       .updateUsingPUT1(this.fichaClinica, this.fichaClinica.id)
    //       .subscribe((fichasClinicas) => {
    //         Swal.fire(
    //           "Actualizar mascota",
    //           `¡${this.fichaClinica.id} actualizado con exito!`,
    //           "success"
    //         );
    //         this.irLista();
    //       });
    //     }else {
    //     //  console.log("LLEGA "+ this.animal.nombre,this.animal.especie,this.animal.raza, this.animal.peso, this.animal.color, this.animal.sexo, this.animal.tamanyo, this.animal.edad);
    // // this.animales.push(this.animal);this.animal={}
    //     this.fichasClinicasService.createUsingPOST1(this.fichaClinica).subscribe(data => {
    //       this.fichaClinica=data;
    //       Swal.fire(
    
    //        "Nueva Ficha",
    //        `¡${this.fichaClinica.id} creada con exito!`,
    //         "success"
    //       );
    //       console.log("imprimiendo", data)
        
    //    //  this.irFicha();
    //    });
    //   }}
    
    //  irLista() {
    //   this.router.navigateByUrl("/TableList");
    // }
    
    // }


  
  