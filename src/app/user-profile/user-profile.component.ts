import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { Animal } from 'app/model/animal';
import { FichaClinica } from 'app/model/fichaClinica';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  animales:any[] = [];
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fichaClinica:FichaClinica={};
  animal: Animal={};


  public formSubmitted = false;

  
  constructor(private animalesService: AnimalesService, private fichasClinicasService: FichasClnicasService, private router: Router,private _formBuilder: FormBuilder) { }

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
  // this.animales.push(this.animal);this.animal={}
      this.animalesService.createUsingPOST(this.animal).subscribe(data => {
        this.animal=data;
        Swal.fire(

         "Nueva Mascota",
         `¡${this.animal.especie} creada con exito!`,
          "success"
        );
        console.log("imprimiendo", data)
      
     //  this.irFicha();
     });
   } }

  irFicha() {
   this.router.navigateByUrl("/registrofichaclinica");
 }





//  Detalle(id: number){
//   this.animalesService.getByIdUsingGET(id).subscribe(data =>{
//     this.animales=data;
//   console.log("listado",data);
//   //this.router.navigate (['/upgrade', id]);
//   });
// }






guardarFicha(form: NgForm) {
  this.formSubmitted = true;
  if (form.invalid) {
    return;
  } 
  if (this.fichaClinica.id) {
    this.fichasClinicasService
      .updateUsingPUT1(this.fichaClinica, this.fichaClinica.id)
      .subscribe((fichasClinicas) => {
        Swal.fire(
          "Actualizar mascota",
          `¡${this.fichaClinica.id} actualizado con exito!`,
          "success"
        );
        this.irLista();
      });
    }else {
    //  console.log("LLEGA "+ this.animal.nombre,this.animal.especie,this.animal.raza, this.animal.peso, this.animal.color, this.animal.sexo, this.animal.tamanyo, this.animal.edad);
// this.animales.push(this.animal);this.animal={}
    this.fichasClinicasService.createUsingPOST1(this.fichaClinica).subscribe(data => {
      this.fichaClinica=data;
      Swal.fire(

       "Nueva Ficha",
       `¡${this.fichaClinica.id} creada con exito!`,
        "success"
      );
      console.log("imprimiendo", data)
    
   //  this.irFicha();
   });
  }}

 irLista() {
  this.router.navigateByUrl("/TableList");
}


}













