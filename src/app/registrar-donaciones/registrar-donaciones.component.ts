import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonacionesService } from 'app/api/donaciones.service';
import { PersonasService } from 'app/api/personas.service';
import { Donacion } from 'app/model/donacion';
import { Persona } from 'app/model/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-donaciones',
  templateUrl: './registrar-donaciones.component.html',
  styleUrls: ['./registrar-donaciones.component.css']
})
export class RegistrarDonacionesComponent implements OnInit {
donaciones:Donacion = {
  descripcion: ''
}
perso:Persona={
  apellidos: '',
  cedula: '',
  celular: '',
  correo: '',
  direccion: '',
  nombre: '',
  telefono: ''
}
cedulas:number
cedu:string
idpersona:number
nombres:string

  constructor(private donacionService:DonacionesService,
    private router:Router, 
    private personaService:PersonasService) {
    }

  ngOnInit(): void {
    localStorage.removeItem("idpersona");

  }
  

  createDonacion(){
    if(this.cedulas===  undefined || this.donaciones.descripcion === undefined || this.donaciones.cantidad === undefined
       || this.donaciones.descripcion === ""  || this.donaciones.cantidad=== undefined){
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
          this.donacionService.crearDonacionUsingPOST(this.donaciones.descripcion, this.idpersona, this.donaciones.cantidad).subscribe(data =>{
            this.donaciones = data
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La donación se a realizado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          }, err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error en los datos!',
            })
          })
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      }) 
    }
  }
  btnAgregarPersona(){
    this.router.navigate(['registroPersonas'])
    }

    getCedulaPersona(){
      this.cedu= this.cedulas.toString();
      if(this.cedu === undefined || this.cedu === ""){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingrese la cedula!',
        })
      }else{
             this.personaService.getPersonasUsingGET1(0,1,this.cedu).subscribe(data =>{
              // this.perso = data.content
              // localStorage.setItem("idpersona", JSON.stringify(data.content[0].id));
              // this.idpersona=JSON.parse(localStorage.getItem("idpersona"));
              this.idpersona = data.content[0].id
              this.nombres=data.content[0].nombre + " "+ data.content[0].apellidos
              
          Swal.fire({
           
            icon: 'success',
            title: 'Cedula encontrada',
            text: 'El adoptante es ' + this.nombres,
          })
          
              },err =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Registro no encontrado!' ,
                })
                this.perso = {
                  apellidos: '',
                  cedula: '',
                  celular: '',
                  correo: '',
                  direccion: '',
                  nombre: '',
                  telefono: ''
                };
                // document.getElementById("tabla").style.display="none";
              })
      }
    
    }

}
