import { Component, OnInit } from '@angular/core';
import { DonacionesService } from 'app/api/donaciones.service';
import { PersonasService } from 'app/api/personas.service';
import { Donacion } from 'app/model/donacion';
import { Persona } from 'app/model/persona';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-donaciones',
  templateUrl: './listar-donaciones.component.html',
  styleUrls: ['./listar-donaciones.component.css']
})
export class ListarDonacionesComponent implements OnInit {
donaciones:Donacion[]=[]
donacionid:Donacion={
  descripcion: ''
}
cedulas:string
descripcion:string
cantidad:number
  constructor(private donacionService:DonacionesService, private personaService:PersonasService) { }

  ngOnInit(): void {
    this.getDonaciones();
  }

  getDonaciones(){
    this.donacionService.getAllDonacionesUsingGET().subscribe(data =>{
      this.donaciones = data
    })
  }

  verCantidad(){
    document.getElementById("cantidad").style.display="block"
    document.getElementById("noVer").style.display="block"
    document.getElementById("ver").style.display="none"
  }

  noVerCantidad(){
    document.getElementById("cantidad").style.display="none"
    document.getElementById("noVer").style.display="none"
    document.getElementById("ver").style.display="block"
  }


  deleteDonacion(id:number){
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
    this.donacionService.eliminarDonacionUsingDELETE(id).subscribe(data =>{})
   this.getDonaciones();
  }
})
  }

getDonacionById(id:number){
this.donacionService.getDonacionPorIdUsingGET(id).subscribe(data => {
this.donacionid=data
this.descripcion=this.donacionid.descripcion
this.cantidad=this.donacionid.cantidad
console.log(this.descripcion+" VALORES");

})
  this.mostrarEditar()
}

updateDonacion(){
  if(this.donacionid.persona.cedula ===  undefined || this.donacionid.descripcion === undefined || this.donacionid.cantidad === undefined
    || this.donacionid.descripcion === ""  || this.donacionid.cantidad=== undefined){
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
        this.donacionService.editarDonacionUsingPUT(this.donacionid.descripcion, this.donacionid.id, this.donacionid.persona.id, this.donacionid.cantidad).subscribe(data=>{
          this.donacionid = data
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

mostrarEditar(){
  document.getElementById("tarjeta").style.display="block";
  document.getElementById("tabla").style.display="none";
}
 
botonCancelar(){
  document.getElementById("tarjeta").style.display="none";
  document.getElementById("tabla").style.display="block";
}




}
