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

// variables de tipo any o cualquiera para guardar en localStorage
animal:any={};
loginUsuario:any={};

public formSubmitted = false;
  constructor(private fichasClinicasService: FichasClnicasService,private router: Router,private _formBuilder: FormBuilder) {
  
    this.animal={};
    this.loginUsuario={};    

   }

  ngOnInit(): void {
    // igualando objetos de tipo cualquiera con datos almacenados en localStorage
    this.animal = JSON.parse(localStorage.getItem('animal'));
    this.loginUsuario = JSON.parse(localStorage.getItem('loginUsuario'));
    // imprimiendo en consola
    console.log("recibiendo información de animal con localstorage",this.animal);
    console.log("recibiendo información de usuario logeado con localstorage",this.loginUsuario);
  }



  saveAdopciones(){
    console.log("LLEGA "+ this.fichaClinica.id,this.animal.id,this.fichaClinica.fechaIngreso, );
    
    if(this.fichaClinica.id ===  undefined || this.animal.id === undefined || this.fichaClinica.fechaIngreso === undefined || this.fichaClinica.motivoConsulta === "" || this.fichaClinica.trc === ""  || this.fichaClinica.conjuntiva === ""  || this.fichaClinica.diagnosticoDiferencial === ""  || this.fichaClinica.examenes_solicitados === ""  || this.fichaClinica.hallazgos ==="" || this.fichaClinica.pronostico ==="" ){
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
        if (result.isConfirmed) {
          this.fichasClinicasService.createUsingPOST1(this.fichaClinica).subscribe(data =>{
            this.fichaClinica.animal.id=this.animal.data.id;
            this.fichaClinica.animal.nombre=this.animal.nombre;
            this.fichaClinica.veterinario.id=this.loginUsuario.data.id;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se a adoptado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          })
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
          
        }
      }) 
    }
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


  
  