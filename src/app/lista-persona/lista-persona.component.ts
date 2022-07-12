import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'app/api/personas.service';
import { Persona } from 'app/model/persona';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {
  personas: Persona[] = []
  personaid: Persona = {
    apellidos: '',
    cedula: '',
    celular: '',
    correo: '',
    direccion: '',
    nombre: '',
    telefono: ''
  }
  cedulas: string
  pagina = 0;
  tamaño = 2;
  constructor(private personaService: PersonasService) { }

  ngOnInit(): void {
    this.listarAllPersonas();
    this.pagina = 0;
  }

  listarAllPersonas() {

    this.personaService.getPersonasUsingGET1(this.pagina, this.tamaño).subscribe(data => {
      this.personas = data.content
    })
  }
  updatePersonas() {
    if (this.personaid.cedula === undefined || this.personaid.nombre === undefined || this.personaid.apellidos === undefined
      || this.personaid.correo === undefined || this.personaid.telefono === undefined || this.personaid.celular === undefined
      || this.personaid.direccion === undefined || this.personaid.cedula === "" || this.personaid.nombre === "" ||
      this.personaid.apellidos === "" || this.personaid.correo === "" || this.personaid.telefono === "" || this.personaid.celular === ""
      || this.personaid.direccion === "") {
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
        confirmButtonText: 'Modiicar',
        denyButtonText: `No modificar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.personaService.updateUsingPUT3(this.personaid, this.personaid.id).subscribe(data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Persona registrada exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          })         
        }
        else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }

  }
  
  getPersonaById(id: number) {
    this.personaService.getByIdUsingGET3(id).subscribe(data => {
      this.personaid = data
      this.cedulas= this.personaid.cedula
      this.mostrarEditar();
      
    })
  }
  deletePersona(id: number){
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
        this.listarAllPersonas();
      }
    })
    this.personaService.deleteUsingDELETE3(id).subscribe(data =>{
      
    })
   
  }
  cancelar(){
    document.getElementById('tarjeta').style.display='none'
    document.getElementById('tabla').style.display='block'
  }

  mostrarEditar(){
    document.getElementById('tarjeta').style.display='block'
    document.getElementById('tabla').style.display='none'
  }
  next() {
    this.pagina = this.pagina + 1;
    console.log(this.pagina);
    this.listarAllPersonas();
  }

  previous() {

    this.pagina = this.pagina - 1;
    if (this.pagina < 0) {
      this.pagina = 0;
    }

    this.listarAllPersonas();
  }

}
