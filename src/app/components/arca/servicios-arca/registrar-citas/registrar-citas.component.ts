import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { ClientesService } from 'app/api/clientes.service';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { Cita } from 'app/model/cita';
import { CitaDto } from 'app/model/citaDto';
import { CitaServiciosArca } from 'app/model/citaServiciosArca';
import { ClienteDto } from 'app/model/clienteDto';
import { ClienteDtoExtends } from 'app/model/clienteDtoExtends';
import { Veterinario } from 'app/model/veterinario';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-citas',
  templateUrl: './registrar-citas.component.html',
  styleUrls: ['./registrar-citas.component.css']
})
export class RegistrarCitasComponent implements OnInit {

  cedulaCliente : string = ''
  clienteDto: ClienteDto = {}
  cliente: ClienteDtoExtends = {}

  // fechaCita: Date = new Date(moment(new Date()).format('YYYY-MM-DD h:mm:ss'));
  fecha: string;
  hora:string = 'Selecciona una hora...';
  opcionHora:string="none"; 
  veterinario: Veterinario = {}

  citaVeterinario: Veterinario = {}
  veterinarioCedula: string
  citaDto: CitaServiciosArca={};
  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService,
    private clienteService: ClientesService) { }
  
  ngOnInit(): void {
  }


  createCita(){
    this.citaDto.fechaCita = this.fecha+' '+this.hora
    if(this.citaDto.estado === undefined || this.veterinarioCedula === undefined || this.citaDto.fechaCita === undefined || this.citaDto.motivo === undefined ||
      this.citaDto.estado === undefined    || this.citaDto.fechaCita === '' || this.citaDto.motivo === '' || this.veterinarioCedula === ''){
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


  /** @Author: Eduardo: --------------------------------------------------------------------------------------------- */

  buscarCliente(): void {
    this.clienteService.getByCedulaUsingGET(this.cedulaCliente).subscribe(data => {
      this.cliente = data
    },
    err => {
      this.mostrarMensajeWarning('Opss!', 'No se ha encontrado un cliente cedula: '+this.cedulaCliente)
    })
  }


  agregarCliente(): void {
    this.clienteService.createUsingPOST1(this.clienteDto).subscribe(
      data => {
        this.setCliente(data.data)
        this.mostrarMensajeExito('Exito!','Cliente guardado exitosamente!')
      },
      err => {
        let codigo: number = err.error.code
        if(codigo == 400){
          this.mostrarMensajeWarning('Opss', 'Por favor, llene correctamente los campos!')
        }else if(codigo == 500){
          this.mostrarMensajeWarning('Opss!', 'Ya existe un cliente con cédula: '+this.clienteDto.cedula)
        }else{
          this.mostrarMensajeError('Opss!', 'Ha ocurrido un error en el servidor, contacta con tu tecnico de confianza!')
        }
      }
    )
  }

  setCliente(data): void{
    this.cliente.apellidos = data.apellidos
    this.cliente.cedula = data.cedula
    this.cliente.celular = data.celular
    this.cliente.correo = data.correo
    this.cliente.direccion = data.direccion
    this.cliente.id = data.id
    this.cliente.nombre = data.nombre
    this.cliente.telefono = data.telefono
  }

  mostrarMensajeExito(titulo: string, mensaje: string): void { 
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    })
  }


  mostrarMensajeError(titulo: string, mensaje: string): void { 
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje
    })
  }


  mostrarMensajeWarning(titulo: string, mensaje: string): void { 
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje
    })
  }

}
