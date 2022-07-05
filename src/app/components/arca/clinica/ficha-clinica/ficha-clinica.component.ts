import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';

import { FichaClinica } from 'app/model/fichaClinica';
import { FichaClinicaDTO } from 'app/model/fichaClinicaDTO';
import { fichaClinicaPost } from 'app/model/fichaClinicaPost';
import { FichaClinicaRequestDTO } from 'app/model/fichaClinicaRequestDTO';
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
fichaClinicaRqstDTO: FichaClinicaRequestDTO={};
fichaClinicaDTO:FichaClinicaDTO={}
idAnimal:number;


// variables de tipo any o cualquiera para guardar en localStorage
animal:any={};
loginUsuario:any={};

public formSubmitted = false;
  constructor(private fichasClinicasService: FichasClnicasService,private router: Router,private _formBuilder: FormBuilder, animalesService:AnimalesService) {
    this.animal={};
    this.loginUsuario={};    

   }
    
  
  ngOnInit(): void {
    this.animal = JSON.parse(localStorage.getItem('animal')).animal;
    // igualando objetos de tipo cualquiera con datos almacenados en localStorage
    this.loginUsuario = JSON.parse(localStorage.getItem('loginUsuario')).persona;
  } 

  // guardar(){
  //   console.log("LLEGA "+ this.animal.id,this.fichaClinica.fechaIngreso, );
    
  //   if( this.fichaClinica.motivoConsulta === "" || this.fichaClinica.trc === ""  || this.fichaClinica.conjuntiva === ""  || this.fichaClinica.diagnosticoDiferencial === ""  || this.fichaClinica.examenesSolicitados === ""  || this.fichaClinica.hallazgos ==="" || this.fichaClinica.pronostico ==="" ){
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Llene todos los campos!',
  //     })
  //   } else{
  //     Swal.fire({
  //       title: 'Seguro quiere realizar esta accion??',
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: 'Registrar',
  //       denyButtonText: `No registrar`,
  //     }).then((result) => {
  //       /* Read more about isConfirmed, isDenied below */
  //       if (result.isConfirmed) {

  //         this.fichaClinica.animalId=this.animal.id;
  //         this.fichaClinica.personaId=2;
  //         console.log(this.fichaClinica);
  //         console.log(this.fichaClinica.personaId+" IDPERSONA");
  //         this.fichasClinicasService.createUsingPOST1(this.fichaClinica).subscribe(data =>{
  //       localStorage.removeItem("animal");
  //           // this.fichaClinica.animal.nombre=this.animal.nombre;
  //           // this.fichaClinica.veterinario.id=this.loginUsuario.data.id;
          
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'success',
  //             title: 'Se a adoptado correctamente',
  //             showConfirmButton: false,
  //             timer: 1500
  //           })
  //           location.reload();
  //         })
           
  //       } else if (result.isDenied) {
  //         Swal.fire('Acción cancelada', '', 'info')
          
  //       }
  //     }) 
  //   }
  // }

  crateFichaClinica(){
    Swal.fire({
      title: 'Seguro quiere realizar esta acción?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.fichasClinicasService.createUsingPOST1(this.fichaClinicaRqstDTO={
          alimentacion:  this.fichaClinicaRqstDTO.alimentacion,
          animalId: this.animal.id,
          conjuntiva:  this.fichaClinicaRqstDTO.conjuntiva,
          costo:  this.fichaClinicaRqstDTO.costo,
          diagnosticoDiferencial:  this.fichaClinicaRqstDTO.diagnosticoDiferencial,
          esterilizacion:  this.fichaClinicaRqstDTO.esterilizacion,
          examenes_solicitados:  this.fichaClinicaRqstDTO.examenes_solicitados,
          fechaIngreso:  this.fichaClinicaRqstDTO.fechaIngreso,
          frecuenciaCardiaca:  this.fichaClinicaRqstDTO.frecuenciaCardiaca,
          frecuenciaRespiratoria:  this.fichaClinicaRqstDTO.frecuenciaRespiratoria,
          hallazgos:  this.fichaClinicaRqstDTO.hallazgos,
          id: 0,
          motivoConsulta:  this.fichaClinicaRqstDTO.motivoConsulta,
          mucosas:  this.fichaClinicaRqstDTO.mucosas,
          personaId: 2,
          pronostico:  this.fichaClinicaRqstDTO.pronostico,
          temperatura:  this.fichaClinicaRqstDTO.temperatura,
          tipoPaciente:  this.fichaClinicaRqstDTO.tipoPaciente,
          trc:  this.fichaClinicaRqstDTO.trc
        }).subscribe(data =>{
          
          this.fichaClinicaDTO = data
        }, err => {
          console.warn("code", err);
          if(err.error.status === 500){
            console.log(err);
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Llene todos los datos!',
            })
          }
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se a registrado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
   


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


  
    }