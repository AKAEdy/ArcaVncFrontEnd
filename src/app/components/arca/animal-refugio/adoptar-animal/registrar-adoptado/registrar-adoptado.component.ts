import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { AdoptanteControllerService } from 'app/api/adoptanteController.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
import { AdoptanteDto } from 'app/model/adoptanteDto';
import { Animal } from 'app/model/animal';

import Swal from 'sweetalert2';


@Component({
  selector: 'registrar-adoptado',
  templateUrl: './registrar-adoptado.component.html',
  styleUrls: ['./registrar-adoptado.component.css']
})
export class RegistrarAdoptadoComponent implements OnInit {
  adopcion: Adopcion = {};
 adoptante: Adoptante = {};
 adoptantesDto: AdoptanteDto={}
 cedulas: string;
 nombres:string;
 direccion:string;
 celular:string;
 correo:string;
 telefono:string;
 telfamiliar:string;
 facebook:string;
 animalStorage : any
  constructor(
    private adopcionesService:AdopcionControllerService, 
    private adoptanteService: AdoptanteControllerService,
    private router:Router) {
 
  }


  ngOnInit(): void {
    this.animalStorage = JSON.parse(localStorage.getItem('animaladoptar'));
    console.log("Nombre "+this.animalStorage.animal.nombre);
    
  }

  delays(n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  saveAdopciones(){    
    if(this.adoptante.id ===  undefined || this.animalStorage.animal.id === undefined || this.adopcion.descripcion === undefined || this.adopcion.descripcion === "" || this.adopcion.fechaAdopcion === ""  || this.adopcion.fechaAdopcion === undefined){
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
          this.adopcionesService.crearAdocionUsingPOST(this.adoptante.id,this.animalStorage.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion).subscribe(data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se a adoptado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          }, err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'el animal ya a sido adoptado!',
            })
          })
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
          
        }
      }) 
    }
  }

  getCedulaAdoptante(){
    if(this.cedulas === undefined || this.cedulas === ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese la cedula!',
      })
    }else{
           this.adoptanteService.getAdoptantePorCedulaUsingGET(this.cedulas).subscribe(data =>{
        this.adoptante = data
        // document.getElementById("tabla").style.display="block";
        this.nombres = this.adoptante.persona.nombre +" " + this.adoptante.persona.apellidos
        this.celular = this.adoptante.persona.celular
        this.direccion = this.adoptante.persona.direccion
        this.correo = this.adoptante.persona.correo
        this.telefono = this.adoptante.persona.telefono
        this.telfamiliar =  this.adoptante.telefonoFamiliar
        this.facebook = this.adoptante.nicknameFacebook
        
            },err =>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registro no encontrado!' ,
              })
              this.adoptante = {};
              // document.getElementById("tabla").style.display="none";
            })
    }
  
  }

  createAdoptante(){
    this.cedulas = this.adoptantesDto.cedula
    this.adopcion.descripcion = ''
    if (this.adoptantesDto.cedula === undefined || this.adoptantesDto.nombre === undefined || this.adoptantesDto.apellidos === undefined
      || this.adoptantesDto.correo === undefined || this.adoptantesDto.telefono === undefined || this.adoptantesDto.celular === undefined
      || this.adoptantesDto.telefonoFamiliar === undefined === undefined
      || this.adoptantesDto.direccion === undefined || this.adoptantesDto.cedula === "" || this.adoptantesDto.nombre === "" ||
      this.adoptantesDto.apellidos === "" || this.adoptantesDto.correo === "" || this.adoptantesDto.telefono === "" || this.adoptantesDto.celular === ""
      || this.adoptantesDto.direccion === ""  || this.adoptantesDto.telefonoFamiliar === "" ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese todos los datos!',
      })
    } else {
      Swal.fire({
        title: 'Seguro quiererealizar esta acción?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: `No registrar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.adoptanteService.crearAdoptanteUsingPOST(this.adoptantesDto).subscribe(data =>{
            this.adoptantesDto = data
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Adoptante registrado exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            // location.reload();
          },err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cédula o correo electronico ya registrado!',
            })
          })  
          await this.delays(0.5);
          this.getCedulaAdoptante()
        }
        else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }
   
  }
  
  comfirmarDocumento(){
  document.getElementById("botonImp").style.display="block";
  document.getElementById("botonReg").style.display="block";
  }

  btnAgregarAdoptante(){
  this.router.navigate(['registrarAdoptantes'])
  }

}
