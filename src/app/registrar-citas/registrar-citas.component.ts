import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { CitaDto } from 'app/model/citaDto';
import { Veterinario } from 'app/model/veterinario';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-citas',
  templateUrl: './registrar-citas.component.html',
  styleUrls: ['./registrar-citas.component.css']
})
export class RegistrarCitasComponent implements OnInit {
  // fechaCita: Date = new Date(moment(new Date()).format('YYYY-MM-DD h:mm:ss'));
  fecha: string;
  hora:string;
  opcionHora:string="none"; 
  veterinario: Veterinario = {}

  citaVeterinario: Veterinario = {}
  veterinarioCedula: string
  citaDto: CitaDto={
  estado: false,
  fechaCita: '',
  motivo: '',
  nombreCliente: '',
  servicios: []
};
  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService) { }
  
  ngOnInit(): void {
  }


  createCita(){
    this.citaDto.fechaCita = this.fecha+' '+this.hora
    if(this.citaDto.estado === undefined || this.veterinarioCedula === undefined || this.citaDto.fechaCita === undefined || this.citaDto.motivo === undefined || this.citaDto.nombreCliente === undefined ||
      this.citaDto.estado === undefined    || this.citaDto.fechaCita === '' || this.citaDto.motivo === '' || this.citaDto.nombreCliente === '' || this.veterinarioCedula === ''){
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
          this.citaDto.estado = true
          this.citaService.crearCitaUsingPOST(this.citaDto, this.citaVeterinario.id).subscribe(data =>{
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



  buscarVeterinario(){
    if(this.veterinarioCedula === undefined || this.veterinarioCedula === ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese la cedula!',
      })
    }else{
      this.veterinarioService.getVeterinariosUsingGET(0,1, this.veterinarioCedula).subscribe  (data => {
        if (data.content[0] === undefined) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Registro no encontrado!' ,
          })
          document.getElementById("btnRegistrar").style.display="none"
        }
        this.citaVeterinario = data.content[0]
        Swal.fire({
          icon: 'success',
          title: 'Cedula encontrada',
          text: 'El veterinario es '+this.citaVeterinario.persona.nombre + " " + this.citaVeterinario.persona.apellidos,
        })
        this.mostrarBtnRegistrar()
      })
    }
  
  }

  mostrarBtnRegistrar(){
    document.getElementById("btnRegistrar").style.display="block"
  }

}
