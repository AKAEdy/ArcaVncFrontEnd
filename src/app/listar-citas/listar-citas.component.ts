import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { CitaArcaExtends } from 'app/model/citaArcaExtends';
import { CitaDto } from 'app/model/citaDto';
import { Veterinario } from 'app/model/veterinario';
import {FormControl} from '@angular/forms';
import { ServiciosService } from 'app/api/servicios.service';
import { ServicioArcaDtoExtends } from 'app/model/servicioArcaDtoExtends';
import { ServicioArcaDto } from 'app/model/servicioArcaDto';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
citas: CitaArcaExtends[]=[];
veterinarios: Veterinario [] = [] 
idVeterinario:string = 'Selecciona un veterinario...'
fecha: string = this.dateToString(new Date());
hora:string = 'Selecciona una hora...';

horasDisponibles: Array<string> = []
fcFechaSeleccionada = new FormControl(this.dateToString(new Date()))
serviciosArca: Array<ServicioArcaDtoExtends> = []
service: ServicioArcaDto={}
servicios: ServicioArcaDtoExtends = {}

//Variables para el multiple select dropdown de servicios ARCA.
fcServicios = new FormControl('');
nombresServicios: Array<string> = [];

cita: CitaDto={
  estado: false,
  fechaCita: '',
  motivo: '',
  nombreCliente: '',
  servicios: []
}
citasid: CitaArcaExtends={}


  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService,private serviciosArcaService: ServiciosService) { }

  ngOnInit(): void {
    this.fechaAnterior();
    this.listarAllCitas();
    this.llamarVeterinarios();
    this.getAllServiciosArca()
  }

  listarAllCitas(){
      this.citaService.getAllCitasUsingGET().subscribe(data => {
      this.citas = data;
    })
  }
  updateCitas(){
    this.citaService.modificarCitaUsingPUT(this.cita,this.citasid.id, this.citasid.veterinario.id).subscribe(data =>{
      this.citasid = data
      location.reload
    })
  }
  getCitasById(id: number){
    this.citaService.getCitaPorIdUsingGET(id).subscribe(data => {
  
      this.citasid = data
     console.log(this.citasid);
     
    })
  }
  
  deleteCitas(id: number){
    this.citaService.eliminarCitaUsingDELETE(id).subscribe(data => {
      location.reload
      console.log(id);
    })

  }
  botonCancelar() {
    document.getElementById('tarjeta').style.display = 'none'
    document.getElementById('tabla').style.display = 'block'
  }
  mostrarEditar() {
    console.log(this.citasid.cliente.nombre);
    
    document.getElementById('tarjeta').style.display = 'block'
    document.getElementById('tabla').style.display = 'none'
  }

  llamarVeterinarios(){
    this.veterinarioService.getAllVeterinariosUsingGET().subscribe(data =>{
      this.veterinarios = data
    })
  }

  fechaAnterior(){
    let mes = this.dateToString(new Date())
    document.getElementById('fechaReserva').setAttribute('min', mes)

    this.fecha = mes
  }

  dateToString(fecha: Date): string {
    let anio = fecha.getFullYear();
    let _dia = fecha.getDate();
    let _mes = fecha.getMonth() + 1; //viene con valores de 0 al 11

    let mes = (_mes < 10)? '0'+_mes : ''+_mes
    let dia = (_dia < 10)? '0'+_dia : ''+_dia

    return anio + '-' + mes + '-'+ dia
  }

  getHorasDisponibles(fecha: string): void {
    this.citaService.getHorasDisponiblesUsingGET(fecha).subscribe(data => this.horasDisponibles = data.horas);
  }

  setHorasSeleccionadas(): void {
    this.getHorasDisponibles(this.fecha)
  }

  getHoraConFormatoAmPm(hora: string): string {
    return (Number(hora.substring(0, 2)) < 12) ? hora + ' am' : hora + ' pm'
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

  getAllServiciosArca(): void {
    this.serviciosArcaService.getAllServiciosArcaUsingGET().subscribe(data => {
      this.serviciosArca = data
      //Añadimos los nombres de los servicios a la lista del multiple select dropdown.
      this.serviciosArca.map((servicio) => this.nombresServicios.push(servicio.nombre))
    })
  }
}
