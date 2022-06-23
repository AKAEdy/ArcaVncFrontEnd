import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'app/api/personas.service';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { Veterinario } from 'app/model/veterinario';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-veterinarios',
  templateUrl: './listar-veterinarios.component.html',
  styleUrls: ['./listar-veterinarios.component.css']
})
export class ListarVeterinariosComponent implements OnInit {
veterinarios: Veterinario[]=[];
veterinarioid: Veterinario={};
buscarCedula:string;
pagina=0;
tamaño=2; 
  constructor(private veterinarioService: VeterinariosService, private personaService:PersonasService) { }

  ngOnInit(): void {
 
    // this.tamaño=2;]
    this.getAllVeterinarios();
    this.pagina=0;
    this.getVeterinarioById(1);
    this.botonCancelar();
  }
 getAllVeterinarios(){
   this.veterinarioService.getVeterinariosUsingGET(this.pagina, this.tamaño).subscribe(data =>{
   this.veterinarios = data.content
   })
 }

 deletVeterinarioById(id: number){
  Swal.fire({
    title: '¿Esta seguro que decea eliminar?',
    text: "No podra revertit los cambios!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FE3838',
    cancelButtonColor: '#878787',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Registro eliminado exitosamente.',
        'success'
      )
      this.getAllVeterinarios();
    }
  })
this.veterinarioService.deleteUsingDELETE8(id).subscribe(data =>{

})
 }

 next(){
  this.pagina = this.pagina + 1;
console.log(this.pagina);
this.getAllVeterinarios();
}

previous(){

  this.pagina = this.pagina - 1;
  if(this.pagina < 0){
    this.pagina = 0;
  }
  
  this.getAllVeterinarios();
}

mostrarEditar(){
  document.getElementById("targeta").style.display="block";
  document.getElementById("tabla").style.display="none";
}

botonCancelar(){
  document.getElementById("targeta").style.display="none";
  document.getElementById("tabla").style.display="block";
}

getVeterinarioById(id:number){
  this.veterinarioService.getByIdUsingGET8(id).subscribe(data =>{
  this.veterinarioid = data
  
  })
  this.mostrarEditar();
}

updateVeterinarios(){
  if (this.veterinarioid.persona.cedula === undefined || this.veterinarioid.cargo === undefined || this.veterinarioid.persona.nombre === undefined
    || this.veterinarioid.persona.apellidos === undefined || this.veterinarioid.persona.telefono === undefined || this.veterinarioid.persona.celular === undefined
    || this.veterinarioid.persona.correo === undefined || this.veterinarioid.persona.direccion === undefined
    || this.veterinarioid.persona.cedula === '' || this.veterinarioid.cargo === '' || this.veterinarioid.persona.nombre === ''
    || this.veterinarioid.persona.apellidos === '' || this.veterinarioid.persona.telefono === ''|| this.veterinarioid.persona.celular === ''
    || this.veterinarioid.persona.correo === '' || this.veterinarioid.persona.direccion === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos!',
      })
    }else{
      Swal.fire({
        title: 'Seguro quiere realizar esta acción?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            denyButtonText: `No actualizar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        this.veterinarioService.updateUsingPUT8(this.veterinarioid, this.veterinarioid.id).subscribe(data=>{
          this.veterinarioid = data
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Veterinario actualizado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          location.reload();
        });
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }
}

getByCedula(){
  this.veterinarioService.getVeterinariosUsingGET(0,1,this.buscarCedula).subscribe(data =>{
this.veterinarios = data.content
  })
}

}
