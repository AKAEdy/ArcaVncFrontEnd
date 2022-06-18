import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
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
 animal: Animal={
   colorCaracteristicas: '',
   edad: 0,
   especie: '',
   fechaNacimiento: undefined,
   foto: '',
   lugarEstancia: '',
   nombre: '',
   observacionesProcedencia: '',
   peso: 0,
   procedencia: '',
   raza: '',
   sexo: '',
   tamanyo: ''
 };
 cedulas: string;
 nombres:string;
 direccion:string;
 celular:string;
 correo:string;
 telefono:string;
 telfamiliar:string;
 facebook:string;
  constructor(private adopcionesService:AdopcionControllerService, private adoptanteService: AdoptanteControllerService) {
 
  }


  ngOnInit(): void {
  }

  saveAdopciones(){
    console.log("LLEGA "+ this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion);
    
    if(this.adoptante.id ===  undefined || this.animal.id === undefined || this.adopcion.descripcion === undefined || this.adopcion.descripcion === "" || this.adopcion.fechaAdopcion === ""  || this.adopcion.fechaAdopcion === undefined){
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
          this.adopcionesService.crearAdocionUsingPOST(this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion).subscribe(data =>{
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
        Swal.fire({
          icon: 'success',
          title: 'Cedula encontrada',
          text: 'El adoptante es '+this.nombres,
        })
        
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
  

}
