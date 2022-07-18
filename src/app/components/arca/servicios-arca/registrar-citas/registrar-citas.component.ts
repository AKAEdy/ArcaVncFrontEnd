import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { CitasService } from 'app/api/citas.service';
import { ClientesService } from 'app/api/clientes.service';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { CitaServiciosArca } from 'app/model/citaServiciosArca';
import { ClienteDto } from 'app/model/clienteDto';
import { ClienteDtoExtends } from 'app/model/clienteDtoExtends';
import { Veterinario } from 'app/model/veterinario';
import { Router } from "@angular/router";
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
  veterinarios: Veterinario [] = [] 
  cita: CitaServiciosArca = {}
  idVeterinario:string = 'Selecciona un veterinario...'
  hora:string = 'Selecciona una hora...'
  fecha: string;

  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService,
    private clienteService: ClientesService, private citasServicio : CitasService, private router: Router) { }
  
  ngOnInit(): void {
    this.llamarVeterinarios();
  }

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

  guardarCita(){
    this.cita.fechaCita = this.fecha+' '+this.hora
    this.cita.cliente_id = this.cliente.id
    this.cita.servicios = []
    
    if (this.idVeterinario != "Selecciona un veterinario..." ) {
      this.citaService.crearCitaUsingPOST(this.cita, Number(this.idVeterinario)).subscribe(data =>{
        this.mostrarMensajeExito("Exito!!!","Se ha registrado correctamente la cita.")
        this.router.navigateByUrl("/listaCitas");
      } ,
      err => {
        this.mostrarMensajeError("Opss","Por favor asegurese de llenar todos los campos.")
      })
    } else {
      this.mostrarMensajeWarning("Opss","Por favor seleccione un veterinario.")
    }


  }

  llamarVeterinarios(){
    this.veterinarioService.getAllVeterinariosUsingGET().subscribe(data =>{
      this.veterinarios = data
    })
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
