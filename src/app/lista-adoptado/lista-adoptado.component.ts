import { Component, OnInit } from '@angular/core';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { Router } from '@angular/router';
import { AdoptanteControllerService } from 'app/api/adoptanteController.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
import Swal from 'sweetalert2';

@Component({
  selector: 'lista-adoptado',
  templateUrl: './lista-adoptado.component.html',
  styleUrls: ['./lista-adoptado.component.css']
})
export class ListaAdoptadoComponent implements OnInit {

  filterpost:any='';
  adopcion:Adopcion[]=[];
  dataSource: any ={};
  adopcionid:Adopcion ={};
  adoptante: Adoptante = {};
  cedulas: string;
  descripcion:string;
  nombreadoptante:string;
  apellidoadoptante:string;
  correoadoptante:string;
  telefonoadoptante:string;
  direcionadoptante:string;
  fechaAdopcion:string;

  constructor( private router: Router, private adopcionService: AdopcionControllerService, private adoptanteService: AdoptanteControllerService) { }

  ngOnInit(): void {

    this.getAllAdopcion();
    this.filterpost=this.adopcion;
  }


  //seguimiento
getByIdAdoptantes(id:number){
  
  localStorage.setItem("idAdoptado", id.toString());
  /*this.adopcionService.etAdopcionPorIdUsingGET(id).subscribe(data =>{
  this.adopcionid = data
  this.nombreadoptante = this.adopcionid.adoptante.persona.nombre
  this.apellidoadoptante = this.adopcionid.adoptante.persona.apellidos
  this.correoadoptante = this.adopcionid.adoptante.persona.correo
  this.telefonoadoptante=this.adopcionid.adoptante.persona.telefono
  this.direcionadoptante=this.adopcionid.adoptante.persona.direccion
  this.fechaAdopcion=this.adopcionid.fechaAdopcion

  })*/

  this.Irseguimiento();
}

  
  getAllAdopcion(){
    this.adopcionService.getAllAdopcionesUsingGET().subscribe(data=>{
      this.adopcion = data;
    })
    
    
}

deleteAdopcion(id:number){
  Swal.fire({
    title: '¿Esta seguro que decea eliminar?',
    text: "No podra revertir los cambios!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FE3838',
    cancelButtonColor: '#878787',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.adopcionService.eliminarAdopcionUsingDELETE(id).subscribe(data =>{
      }),err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al eliminar la adopción!',
        })
      }
      Swal.fire(
        'Eliminado!',
        'Registro eliminado exitosamente.',
        'success'
      )
     
      this.getAllAdopcion();
    }
  })
  
}

getByIdAdopcion(id:number){
this.adopcionService.etAdopcionPorIdUsingGET(id).subscribe(data =>{
this.adopcionid = data
this.cedulas = this.adopcionid.adoptante.persona.cedula
this.descripcion = this.adopcionid.descripcion
})
  this.mostrarEditar();
}



getCedulaAdoptante(){
  this.cedulas = this.adopcionid.adoptante.persona.cedula
  if(this.cedulas === undefined || this.cedulas === ""){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese la cédula!',
    })
  }else{
         this.adoptanteService.getAdoptantePorCedulaUsingGET(this.cedulas).subscribe(data =>{
      this.adoptante = data
      // document.getElementById("tabla").style.display="block";
     
      Swal.fire({
        icon: 'success',
        title: 'Cédula encontrada',
        text: 'El adoptante es '+this.adoptante.persona.nombre,
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

updateAdopcion(){
  if(this.adopcionid.descripcion === undefined || this.adopcionid.descripcion === "" || this.adopcionid.fechaAdopcion === ""  || this.adopcionid.fechaAdopcion === undefined){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Llene todos los campos!',
    })
  } else{
    Swal.fire({
      title: 'Seguro quiere realizar esta acción?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      denyButtonText: `No registrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this.adopcionService.actualizarAdocionUsingPUT(this.adopcionid.id,this.adopcionid.animal.id, this.adopcionid.descripcion,this.adopcionid.fechaAdopcion).subscribe(data =>{
        this.adopcionid = data
       
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se a actualizado correctamente',
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

mostrarEditar(){
  document.getElementById("tarjeta").style.display="block";
  document.getElementById("lista").style.display="none";
}

botonCancelar(){
  document.getElementById("tarjeta").style.display="none";
  document.getElementById("lista").style.display="block";
}

Irseguimiento() {
  this.router.navigateByUrl("/registrar-seguimiento");
}

}