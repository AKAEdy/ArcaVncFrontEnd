import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { CitaArcaExtends } from 'app/model/citaArcaExtends';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { VeterinariosService } from 'app/api/veterinarios.service';
import { Veterinario } from 'app/model/veterinario';
import { CitaServiciosArca } from 'app/model/citaServiciosArca';
import { ServicioArca } from 'app/model/servicioArca';
import { urlToHttpOptions } from 'url';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
  
  citas: CitaArcaExtends[]=[];
  fechaBusqueda: string = this.dateToString(new Date())
  cedulaBusqueda: string = ''
  citaSeleccionada:CitaArcaExtends = {}
  veterinarios: Veterinario [] = [] 
  detallesCita: string = ''
  serviciosCita: ServicioArca[] = []
  citaEdit: CitaServiciosArca = {}

  fechaMinInput: string = this.dateToString(new Date())
  fechaCitaEdit: string = ''
  idVeterinarioEdit: number = 0
  horasDisponibles: Array<string> = []
  horaEdit:string = 'Selecciona una hora...'
  

  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService, private router: Router) { }


  ngOnInit(): void {
    this.limpiarCamposCita()
    this.getCitasPorFecha()
    this.getAllVeterinarios()
  }

  getHorasDisponibles(fecha: string): void {
    this.citaService.getHorasDisponiblesUsingGET(fecha).subscribe(data => this.horasDisponibles = data.horas);
  }

  getAllVeterinarios(){
    this.veterinarioService.getAllVeterinariosUsingGET().subscribe(data =>{
      this.veterinarios = data
    })
  }

  getCitasPorFecha(){
    if (this.fechaBusqueda != null && this.fechaBusqueda != undefined && this.fechaBusqueda != "") {
      this.citas = []
      this.citaService.getCitasPorFechaAgendaUsingGET(this.fechaBusqueda).subscribe(data =>{
        this.citas = data.citas
      })
    }
  }

  getCitasPorCedula(){
    if (this.cedulaBusqueda != null && this.cedulaBusqueda != undefined && this.cedulaBusqueda != "") {
      this.citas = []
      this.citaService.getAllCitasActivasPorClienteUsingGET(this.cedulaBusqueda).subscribe(data => {
        this.citas = data
      })
    }
  }

   cargarDetallesCita(idCita: number){
    this.detallesCita = ''
    this.citaService.getAllDetallesCitaUsingGET(idCita).subscribe(data => {
      this.serviciosCita = []
      let limite = data.length
      if(limite > 0){
        for(let i = 0; i < limite; i++){
          this.serviciosCita.push(data[i].servicioArca)
          this.detallesCita += (i < limite-1)? data[i].servicioArca.nombre+', ':  data[i].servicioArca.nombre+'.'
        }
      }else{
        this.detallesCita = 'No se han seleccionado servicios para esta cita.'
      }
    })
  }

  eliminarCita(idCita: number): void{
    this.mostrarMensajeConfirmacion('¿Esta seguro que desea eliminar?', 'No podra revertir los cambios!', 'Sí, eliminar!').then(
      result => {
        if(result.isConfirmed){
          this.citaService.eliminarCitaUsingDELETE(idCita).subscribe(data => {
            this.router.navigateByUrl("/listaCitas");
            this.mostrarMensajeExito('Exito!', 'Cita eliminada exitosamente')
          })
        }else if(result.isDenied){
          Swal.fire('Acción cancelada', '', 'info')
        }
      }
    )
  }

  editarCita(): void{
    if(this.horaEdit != 'Selecciona una hora...' && this.fechaCitaEdit != '' && this.idVeterinarioEdit > 0){
      this.mostrarMensajeConfirmacion('¿Esta seguro que desea modificar esta cita?',  'No podra revertir los cambios!', 'Sí, modificar!').then((result) => {
        if(result.isConfirmed){
          this.citaEdit.cliente_id = this.citaSeleccionada.cliente.id
          this.citaEdit.estado = true
          this.citaEdit.servicios = this.serviciosCita
          this.citaEdit.fechaCita = this.fechaCitaEdit+' '+this.horaEdit
          this.citaEdit.motivo = this.citaSeleccionada.motivo
          console.log('Data: '+this.citaEdit);
          console.log('Data: '+this.citaEdit.servicios[0].id);
          
          this.citaService.modificarCitaUsingPUT(this.citaEdit, this.citaSeleccionada.id, this.idVeterinarioEdit).subscribe(data => {
            this.router.navigateByUrl('/listaCitas')
            this.mostrarMensajeExito('Exito!', 'Se han modificado los datos correctamente.')
          })
        }else if(result.isDenied){
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    }else{
      this.mostrarMensajeWarning('Ops!', 'favor, llene correctamente los datos de fecha, hora y veterinario!')
    }
  }

  setCitaSeleccionada(cita: CitaArcaExtends){
    this.citaSeleccionada = cita
    this.cargarDetallesCita(cita.id)
    this.fechaCitaEdit = this.dateToString(this.getDateOf(cita.fechaCita))
    this.idVeterinarioEdit = cita.veterinario.id
  }

  getHora(fecha:string){
    return fecha.substring(11)

  }

  getFecha(fecha:string){
    return fecha.substring(0,11)
  }

  limpiarCamposCita(): void{
    this.citaSeleccionada = {
      cliente: {
        apellidos: "",cedula : "", celular: "", correo: "", direccion: "", id: 0, nombre: "", telefono: ""
      },
      veterinario: {
        cargo: "", id: 0, 
        persona: {
          apellidos: "", cedula: "", celular: "", correo: "", direccion: "", id: 0, nombre: "", telefono: ""
        }
      },
      estado: true,
      fechaCita: "yyyy-MM-dd HH:mm",
      id: 0,
      motivo: ""
    }
  }

  dateToString(fecha: Date): string {
    let anio = fecha.getFullYear();
    let _dia = fecha.getDate();
    let _mes = fecha.getMonth() + 1; //viene con valores de 0 al 11

    let mes = (_mes < 10)? '0'+_mes : ''+_mes
    let dia = (_dia < 10)? '0'+_dia : ''+_dia

    return anio + '-' + mes + '-'+ dia
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

  mostrarMensajeConfirmacion(titulo: string, texto: string, mensajeConfirmacion: string){
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FE3838',
      cancelButtonColor: '#878787',
      confirmButtonText: mensajeConfirmacion,
    })
  }

  getDateOf(fechaCita: string): Date {
    return new Date(fechaCita)
  }

  getHoraConFormatoAmPm(hora: string): string {
    return (Number(hora.substring(0, 2)) < 12) ? hora + ' am' : hora + ' pm'
  }

  setHorasSeleccionadas(): void {
    this.getHorasDisponibles(this.fechaCitaEdit)
  }

}
