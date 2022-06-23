import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from 'app/api/voluntarios.service';
import { Voluntario } from 'app/model/voluntario';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-voluntarios',
  templateUrl: './listar-voluntarios.component.html',
  styleUrls: ['./listar-voluntarios.component.css']
})
export class ListarVoluntariosComponent implements OnInit {

  voluntarios: Voluntario[]=[];
  voluntarioid:Voluntario={}
  pagina=0;
  tamaño=2;   
  constructor(private voluntarioService:VoluntariosService) { }

  ngOnInit(): void {
    this.getAllVoluntarios()
  }

  getAllVoluntarios(){
   this.voluntarioService.getVoluntariosUsingGET(this.pagina, this.tamaño).subscribe(data =>{
    this.voluntarios = data.content
   })
  }

  next(){
    this.pagina = this.pagina + 1;
  console.log(this.pagina);
  this.getAllVoluntarios();
  }
  
  previous(){
  
    this.pagina = this.pagina - 1;
    if(this.pagina < 0){
      this.pagina = 0;
    }
    
    this.getAllVoluntarios();
  }

  getVoluntariosById(id:number){
this.voluntarioService.getByIdUsingGET9(id).subscribe(data =>{
this.voluntarioid = data
})
this.mostrarEditar();
  }

  mostrarEditar(){
    document.getElementById("targeta").style.display="block";
    document.getElementById("tabla").style.display="none";
  }
   
  botonCancelar(){
    document.getElementById("targeta").style.display="none";
    document.getElementById("tabla").style.display="block";
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
        this.getAllVoluntarios;
      }
    })
  this.voluntarioService.deleteUsingDELETE9(id).subscribe(data =>{
  
  })
   }

   updateVeterinarios(){
    if(this.voluntarioid.persona.cedula === undefined || this.voluntarioid.actividad === undefined || this.voluntarioid.persona.nombre === undefined
    || this.voluntarioid.persona.apellidos === undefined || this.voluntarioid.persona.telefono === undefined || this.voluntarioid.persona.celular === undefined
    || this.voluntarioid.persona.correo === undefined || this.voluntarioid.persona.direccion === undefined || this.voluntarioid.tipo === undefined
    || this.voluntarioid.persona.cedula === '' || this.voluntarioid.actividad=== '' || this.voluntarioid.persona.nombre === ''
    || this.voluntarioid.persona.apellidos === '' || this.voluntarioid.persona.telefono === ''|| this.voluntarioid.persona.celular === ''
    || this.voluntarioid.persona.correo === '' || this.voluntarioid.persona.direccion === ''  || this.voluntarioid.tipo === '') {
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
          this.voluntarioService.updateUsingPUT9(this.voluntarioid, this.voluntarioid.id).subscribe(data=>{
            this.voluntarioid = data
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

}
