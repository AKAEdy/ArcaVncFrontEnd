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
import {FormControl} from '@angular/forms';
import { ServiciosService } from 'app/api/servicios.service';
import { ServicioArcaDtoExtends } from 'app/model/servicioArcaDtoExtends';
import { ServicioArcaDto } from 'app/model/servicioArcaDto';

@Component({
  selector: 'registrar-citas',
  templateUrl: './registrar-citas.component.html',
  styleUrls: ['./registrar-citas.component.css']
})
export class RegistrarCitasComponent implements OnInit {

  //Variables para el multiple select dropdown de servicios ARCA.
  fcServicios = new FormControl('');
  nombresServicios: Array<string> = [];

  clienteDto: ClienteDto = {}
  cliente: ClienteDtoExtends = {}
  veterinarios: Veterinario [] = [] 
  cita: CitaServiciosArca = {}
  serviciosArca: Array<ServicioArcaDtoExtends> = []
  servicios: ServicioArcaDtoExtends = {}
  service: ServicioArcaDto={}

  idVeterinario:string = 'Selecciona un veterinario...'
  hora:string = 'Selecciona una hora...'
  cedulaCliente : string = ''
  fecha: string;

  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService,
    private clienteService: ClientesService, private serviciosArcaService: ServiciosService, private router: Router) { }
  
  ngOnInit(): void {
    this.fechaAnterior(); 
    this.llamarVeterinarios()
    this.getAllServiciosArca()
  }


  getAllServiciosArca(): void {
    this.serviciosArcaService.getAllServiciosArcaUsingGET().subscribe(data => {
      this.serviciosArca = data
      //Añadimos los nombres de los servicios a la lista del multiple select dropdown.
      this.serviciosArca.map((servicio) => this.nombresServicios.push(servicio.nombre))
    })
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

  getServiciosArcaSeleccionados(): Array<ServicioArcaDtoExtends>{
    let serviciosSeleccionados = []

    Array.from(this.fcServicios.value).forEach(servicioSelect => {
      this.serviciosArca.map((servicio) => {
        if(servicio.nombre == servicioSelect){
          serviciosSeleccionados.push(servicio)
        }
      })
    });

    return serviciosSeleccionados
  }

  guardarCita(){

    this.cita.fechaCita = this.fecha+' '+this.hora
    this.cita.cliente_id = this.cliente.id
    this.cita.servicios = this.getServiciosArcaSeleccionados()
    
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

  guardarServicio(){
    this.serviciosArcaService.crearServicioArcaUsingPOST(this.service).subscribe(data =>{
      this.servicios = data
      this.mostrarMensajeExito('Exito!','Servicio creado exitosamente!')
    })
  }

  fechaAnterior(){
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var dia = fecha.getDate();
    var _mes = fecha.getMonth(); //viene con valores de 0 al 11
    var mes = ""
    _mes = _mes + 1; //ahora lo tienes de 1 al 12
    if (_mes < 10) //ahora le agregas un 0 para el formato date
    {
      mes = "0" + _mes;
    }else {
      mes = _mes.toString();
    }
    mes = anio + '-' + mes + '-' + dia;
    document.getElementById('fechaReserva').setAttribute('min', mes)

    this.fecha = mes
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
