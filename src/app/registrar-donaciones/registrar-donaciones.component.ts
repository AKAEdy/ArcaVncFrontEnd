import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonacionesService } from 'app/api/donaciones.service';
import { Donacion } from 'app/model/donacion';
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
cedulas:number
  constructor(private donacionService:DonacionesService,private router:Router) { 
  }

  ngOnInit(): void {
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
          this.donacionService.crearDonacionUsingPOST(this.donaciones.descripcion, this.cedulas, this.donaciones.cantidad).subscribe(data =>{
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
}
