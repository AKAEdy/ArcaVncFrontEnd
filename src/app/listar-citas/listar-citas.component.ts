import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { CitaArcaExtends } from 'app/model/citaArcaExtends';
import { CitaDto } from 'app/model/citaDto';
import { Veterinario } from 'app/model/veterinario';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
citas: CitaArcaExtends[]=[];
veterinarios: Veterinario [] = [] 
idVeterinario:string = 'Selecciona un veterinario...'
fecha: string;
hora:string = 'Selecciona una hora...'
cita: CitaDto={
  estado: false,
  fechaCita: '',
  motivo: '',
  nombreCliente: '',
  servicios: []
}
citasid: CitaArcaExtends={}

  constructor(private citaService: CitasService, private veterinarioService: VeterinariosService) { }

  ngOnInit(): void {
    this.listarAllCitas();
    this.llamarVeterinarios();
  }

  listarAllCitas(){
    this.citaService.getAllCitasUsingGET().subscribe(data => {
      this.citas = data;
    })
  }
  updateCitas(){
    // this.citaService.modificarCitaUsingPUT(this.cita = 
    //   {
    //     "estado": true,
    //     "fechaCita": "yyyy-MM-dd HH:mm",
    //     "motivo": "string",
    //     "nombreCliente": "string",
    //     "servicios": [
    //       {
    //         "descripcion": "string",
    //         "id": 0,
    //         "nombre": "string",
    //         "precio": 0
    //       }
    //     ]
    //   }, this.citasid.id, this.citasid.veterinario.id).subscribe(data =>{
    //   this.citasid = data
    //   location.reload
    // })
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

}
