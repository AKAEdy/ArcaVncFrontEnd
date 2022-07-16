import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { CitaDto } from 'app/model/citaDto';
import { CitaDtoExtends } from 'app/model/citaDtoExtends';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
citas: CitaDtoExtends[]=[];
cita: CitaDto={
  estado: false,
  fechaCita: '',
  motivo: '',
  nombreCliente: '',
  servicios: []
}
citasid: CitaDtoExtends={
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
    this.citaService.modificarCitaUsingPUT(this.cita = 
      {
        "estado": true,
        "fechaCita": "yyyy-MM-dd HH:mm",
        "motivo": "string",
        "nombreCliente": "string",
        "servicios": [
          {
            "descripcion": "string",
            "id": 0,
            "nombre": "string",
            "precio": 0
          }
        ]
      }, this.citasid.id, this.citasid.veterinario.id).subscribe(data =>{
      this.citasid = data
      location.reload
    })
  }
  getCitasById(id: number){
    this.citaService.getCitaPorIdUsingGET(id).subscribe(data => {
  
      this.citasid = data
     
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
