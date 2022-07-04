import { Component, OnInit } from '@angular/core';
import { AdoptanteControllerService } from 'app/api/adoptanteController.service';
import { AdoptantesService } from 'app/api/adoptantes.service';
import { Adoptante } from 'app/model/adoptante';
import { AdoptanteDto } from 'app/model/adoptanteDto';
import { Persona } from 'app/model/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-adoptante',
  templateUrl: './listar-adoptante.component.html',
  styleUrls: ['./listar-adoptante.component.css']
})
export class ListarAdoptanteComponent implements OnInit {
adoptante: Adoptante[]=[]
adoptanteDto: AdoptanteDto={
  persona: undefined
}
persona:Persona={
  apellidos: '',
  cedula: '',
  celular: '',
  correo: '',
  direccion: '',
  nombre: '',
  telefono: ''
}
idadoptante:number
  constructor(private adoptanteService:AdoptantesService) { }

  ngOnInit(): void {
    this.getAllAdoptantes();
  }

  getAllAdoptantes(){
    this.adoptanteService.getAllAdoptantesUsingGET().subscribe(data =>{
      this.adoptante = data
    })
  }

  getIdAdoptante(id: number){
    this.adoptanteService.getAdoptantePorIdUsingGET(id).subscribe(data =>{
this.adoptanteDto = data
this.persona.cedula = data.persona.cedula
this.persona.nombre = data.persona.nombre
this.persona.apellidos = data.persona.apellidos
this.persona.correo = data.persona.correo
this.persona.telefono = data.persona.telefono
this.persona.celular = data.persona.celular
this.persona.direccion = data.persona.direccion
this.idadoptante=id
console.log(id+ " IDDD");

    })
    this.mostrarEditar();
  }

  updateAdoptantes(id:number){
    if (this.persona.cedula === undefined || this.persona.nombre === undefined || this.persona.apellidos === undefined
     || this.persona.correo === undefined || this.persona.telefono === undefined || this.persona.celular === undefined
     || this.adoptanteDto.telefonoFamiliar === undefined || this.adoptanteDto.nicknameFacebook === undefined
     || this.persona.direccion === undefined || this.persona.cedula === "" || this.persona.nombre === "" ||
     this.persona.apellidos === "" || this.persona.correo === "" || this.persona.telefono === "" || this.persona.celular === ""
      || this.persona.direccion === ""  || this.adoptanteDto.telefonoFamiliar === ""  || this.adoptanteDto.nicknameFacebook === "") {
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
        confirmButtonText: 'Modifica',
        denyButtonText: `No modificar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.adoptanteDto.cedula = this.persona.cedula
          this.adoptanteDto.nombre = this.persona.nombre
          this.adoptanteDto.apellidos = this.persona.apellidos
          this.adoptanteDto.correo = this.persona.correo
          this.adoptanteDto.telefono = this.persona.telefono
          this.adoptanteDto.celular = this.persona.celular
          this.adoptanteDto.direccion = this.persona.direccion
          
          this.adoptanteService.actualizarAdoptanteUsingPUT(this.adoptanteDto,id).subscribe(data=>{
           
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Adoptante registrado exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          },err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cédula o correo electronico ya registrado!',
            })
          })  
        }
        else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }
   

    

  }


  mostrarEditar(){
    document.getElementById("tarjeta").style.display="block";
    document.getElementById("tabla").style.display="none";
  }
  
  botonCancelar(){
    document.getElementById("tarjeta").style.display="none";
    document.getElementById("tabla").style.display="block";
  }

}
