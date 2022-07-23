import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { CitaArcaExtends } from 'app/model/citaArcaExtends';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
  citas: CitaArcaExtends[]=[];
  fechaBusqueda: string = this.dateToString(new Date())
  cedulaBusqueda: string = ""
  citaSeleccionada:CitaArcaExtends = {}


  constructor(private citaService: CitasService) { }


  ngOnInit(): void {
    this.getCitasPorFecha();
  }

  getCitasPorFecha(){
    console.log("Fecha: "+ this.fechaBusqueda);
    
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

  setCitaSeleccionada(cita: CitaArcaExtends){
    this.citaSeleccionada = cita
  }

  getHora(fecha:string){
    return fecha.substring(11)
  }

  getFecha(fecha:string){
    return fecha.substring(0,11)
  }

  dateToString(fecha: Date): string {
    let anio = fecha.getFullYear();
    let _dia = fecha.getDate();
    let _mes = fecha.getMonth() + 1; //viene con valores de 0 al 11

    let mes = (_mes < 10)? '0'+_mes : ''+_mes
    let dia = (_dia < 10)? '0'+_dia : ''+_dia

    return anio + '-' + mes + '-'+ dia
  }
}
