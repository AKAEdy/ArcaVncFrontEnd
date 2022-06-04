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
  fechaCita: Date = new Date(moment(new Date()).format('YYYY-MM-DD h:mm:ss'));
  
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
    
  }

  createCita(){
    
    // this.fechaCita = moment(this.citaDto.fechaCita,"yyyy/MM/dd").toDate()
    // if(this.citaDto === undefined || this.veterinario.id === undefined){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Ingrese todos los datos!',
    //   })
    // }else{
      this.citaService.crearCitaUsingPOST(this.citaDto, this.veterinario.id).subscribe(data =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita agendada exitosamente',
          showConfirmButton: false,
          timer: 1500
          
        })
            })
          //  x
         
    console.log(this.citaDto.fechaCita);
    
  }
}
