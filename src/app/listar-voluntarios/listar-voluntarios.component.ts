import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from 'app/api/voluntarios.service';
import { Voluntario } from 'app/model/voluntario';
import { VoluntarioDto } from 'app/model/voluntarioDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-voluntarios',
  templateUrl: './listar-voluntarios.component.html',
  styleUrls: ['./listar-voluntarios.component.css']
})
export class ListarVoluntariosComponent implements OnInit {
  buscarCedula:string;
  voluntarioscedula:Voluntario={}
  voluntarios: Voluntario[]=[];
  voluntariosid:Voluntario={}
  voluntarioid:VoluntarioDto={
    actividad: '',
    apellidos: '',
    cedula: '',
    celular: '',
    correo: '',
    direccion: '',
    nombre: '',
    telefono: '',
    tipo: ''
  }
  pagina=0;
  tamaño=2;  

  idvoluntario:number
  cedulas:string 
  actividades:string
    apellidoo:string
    celulares:string
    correos:string
    direcciones:string
    nombres:string
    telefonos:string
    tipos:string
  constructor(private voluntarioService:VoluntariosService) { }

  ngOnInit(): void {
    this.getAllVoluntarios()
      this.getVoluntariosById(4);
    
    this.botonCancelar();
  }

  getAllVoluntarios(){
   this.voluntarioService.getVoluntariosUsingGET(this.pagina, this.tamaño).subscribe(data =>{
    this.voluntarios = data.content
    document.getElementById("tablacedula").style.display="none";
    document.getElementById("tabla").style.display="block";
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
this.voluntarioService.getByIdUsingGET10(id).subscribe(data =>{
this.voluntariosid = data
})
this.mostrarEditar();
  }

  mostrarEditar(){
    document.getElementById("targeta").style.display="block";
    document.getElementById("tabla").style.display="none";
    document.getElementById("tablacedula").style.display="none";
  }

   
  botonCancelar(){
    document.getElementById("targeta").style.display="none";
    document.getElementById("tabla").style.display="block";
  }

  deletVoluntarioById(id: number){
    Swal.fire({
      title: '¿Esta seguro que desea eliminar?',
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
        this.voluntarioService.deleteUsingDELETE10(id).subscribe(data =>{
  
        })
        this.getAllVoluntarios;
      }
    })
 
   }

   updateVeterinarios(){
    if(this.voluntariosid.persona.cedula === undefined || this.voluntariosid.actividad === undefined || this.voluntariosid.persona.nombre === undefined
    || this.voluntariosid.persona.apellidos === undefined || this.voluntariosid.persona.telefono === undefined || this.voluntariosid.persona.celular === undefined
    || this.voluntariosid.persona.correo === undefined || this.voluntariosid.persona.direccion === undefined || this.voluntariosid.tipo === undefined
    || this.voluntariosid.persona.cedula === '' || this.voluntariosid.actividad=== '' || this.voluntariosid.persona.nombre === ''
    || this.voluntariosid.persona.apellidos === '' || this.voluntariosid.persona.telefono === ''|| this.voluntariosid.persona.celular === ''
    || this.voluntariosid.persona.correo === '' || this.voluntariosid.persona.direccion === ''  || this.voluntariosid.tipo === '') {
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
            this.voluntarioid.cedula = this.voluntariosid.persona.cedula
            this.voluntarioid.actividad = this.voluntariosid.actividad
            this.voluntarioid.apellidos = this.voluntariosid.persona.apellidos
            this.voluntarioid.celular = this.voluntariosid.persona.celular
            this.voluntarioid.correo = this.voluntariosid.persona.correo
            this.voluntarioid.direccion = this.voluntariosid.persona.direccion
            this.voluntarioid.nombre = this.voluntariosid.persona.nombre
            this.voluntarioid.telefono = this.voluntariosid.persona.telefono
            this.voluntarioid.tipo = this.voluntariosid.tipo
      
            console.log("listaaaaa" + this.voluntarioid.cedula +" " + this.voluntarioid.actividad +" " +this.voluntarioid.apellidos);
          this.voluntarioService.updateUsingPUT10(this.voluntarioid, this.voluntariosid.id).subscribe(data=>{
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

  getByCedula(){
    this.voluntarioService.findByCedulaUsingGET1(this.buscarCedula).subscribe(data =>{
  this.voluntarioscedula = data
  this.idvoluntario=this.voluntarioscedula.id
  this.cedulas=this.voluntarioscedula.persona.cedula
  this.actividades = this.voluntarioscedula.actividad
    this.apellidoo= this.voluntarioscedula.persona.apellidos
    this.celulares=this.voluntarioscedula.persona.celular
    this.correos=this.voluntarioscedula.persona.correo
    this.direcciones=this.voluntarioscedula.persona.direccion
    this.nombres= this.voluntarioscedula.persona.nombre
    this.telefonos= this.voluntarioscedula.persona.telefono
    this.tipos= this.voluntarioscedula.tipo
})
document.getElementById("tablacedula").style.display="block";
document.getElementById("tabla").style.display="none";
  }

}
