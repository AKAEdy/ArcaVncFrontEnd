import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { Cita } from 'app/model/cita';
import { CitaDto } from 'app/model/citaDto';
import { Veterinario } from 'app/model/veterinario';
import { data } from 'jquery';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-citas',
  templateUrl: './registrar-citas.component.html',
  styleUrls: ['./registrar-citas.component.css']
})
export class RegistrarCitasComponent implements OnInit {
  // fechaCita: Date = new Date(moment(new Date()).format('YYYY-MM-DD h:mm:ss'));
  fecha: string;
  hora:String;
  opcionHora:string="none"; 
  veterinario: Veterinario = {}

  citaDto: CitaDto={
  estado: false,
  fechaCita: '',
  motivo: '',
  nombreCliente: '',
  servicios: []
};
  constructor(private citaService: CitasService) { }
  
  ngOnInit(): void {
    this.opcionHoras();
  }

  createCita(){
    this.citaDto.fechaCita = this.fecha+' '+this.hora
    if(this.citaDto.estado === undefined || this.veterinario.id === undefined || this.citaDto.fechaCita === undefined || this.citaDto.motivo === undefined || this.citaDto.nombreCliente === undefined ||
      this.citaDto.estado === undefined    || this.citaDto.fechaCita === '' || this.citaDto.motivo === '' || this.citaDto.nombreCliente === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese todos los datos!',
      })
    }else{
      Swal.fire({
        title: 'Seguro quiere realizar esta acción?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.citaService.crearCitaUsingPOST(this.citaDto, this.veterinario.id).subscribe(data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cita agendada exitosamente',
              showConfirmButton: false,
              timer: 1500
              
            })
            location.reload();
                }, err => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Esta fecha y hora ya esta registrada!',
                  })
              })
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
          }
  }

  opcionHoras(){
if(this.opcionHora === 'opcion1' ){
  document.getElementById("op1").style.display = "inline";
}else{
  document.getElementById("op1").style.display = "none";
}

if(this.opcionHora === 'opcion2' ){
  document.getElementById("op2").style.display = "inline";
}else{
  document.getElementById("op2").style.display = "none";
}


if(this.opcionHora === 'opcion3' ){
  document.getElementById("op3").style.display = "inline";
}else{
  document.getElementById("op3").style.display = "none";
}


if(this.opcionHora === 'opcion4' ){
  document.getElementById("op4").style.display = "inline";
}else{
  document.getElementById("op4").style.display = "none";
}
  }

}
