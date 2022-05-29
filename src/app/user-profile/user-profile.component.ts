import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  animal: Animal={};
  public formSubmitted = false;
  
  constructor(private animalesService: AnimalesService, private router: Router,) { }

  ngOnInit():void {

  }
  // saveAnimal(){
  //  // console.log("LLEGA "+ this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion);
    
    
  //     this.animalesService.createUsingPOST(this.animal).subscribe(data =>{
  //       console.log("LOS DATOS"+data);
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Se a adoptado correctamente',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     })
  //   }
  
  // }














s



  guardarMascota(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    } 
    if (this.animal.id) {
      this.animalesService
        .updateUsingPUT(this.animal, this.animal.id)
        .subscribe((animales) => {
          Swal.fire(
            "Actualizar mascota",
            `¡${this.animal.nombre} actualizado con exito!`,
            "success"
          );
          this.irFicha();
        });
      }else {
      //  console.log("LLEGA "+ this.animal.nombre,this.animal.especie,this.animal.raza, this.animal.peso, this.animal.color, this.animal.sexo, this.animal.tamanyo, this.animal.edad);
   
      this.animalesService.createUsingPOST(this.animal).subscribe(data => {
        this.animal=data;
        Swal.fire(

         "Nueva Mascota",
         `¡${data.especie} creada con exito!`,
          "success"
        );
        console.log("imprimiendo", data)
       this.irFicha();
     });
   } }

  irFicha() {
   this.router.navigateByUrl("/registrofichaclinica");
 }



}













