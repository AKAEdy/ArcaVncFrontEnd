import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { Cita } from 'app/model/cita';
import { CitaDto } from 'app/model/citaDto';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
citas: Cita[]=[];
cita: CitaDto={
  estado: false,
  fechaCita: '',
  motivo: '',
  nombreCliente: '',
  servicios: []
}
citasid: Cita={
  estado: false,
  fechaCita: undefined,
  motivo: '',
  nombreCliente: ''
}

  constructor(private citaService: CitasService) { }

  ngOnInit(): void {
    this.listarAllCitas();
  }

  listarAllCitas(){
    this.citaService.getAllCitasUsingGET().subscribe(data => {
      this.citas = data;
    })
  }
  updateCitas(){
    this.citaService.modificarCitaUsingPUT(this.cita, this.citasid.id, this.citasid.veterinario.id).subscribe(data =>{
      this.citasid = data
      location.reload
    })
  }
  getCitasById(id: number){
    this.citaService.getCitaPorIdUsingGET(id).subscribe(data => {
  
      this.citasid = data
      this.mostrarEditar()
      console.log(id);
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
    document.getElementById('tarjeta').style.display = 'block'
    document.getElementById('tabla').style.display = 'none'
  }

}
