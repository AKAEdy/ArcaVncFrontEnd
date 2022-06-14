import { Component, OnInit } from '@angular/core';
import { CitasService } from 'app/api/citas.service';
import { Cita } from 'app/model/cita';

@Component({
  selector: 'listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent implements OnInit {
citas: Cita[]=[];

  constructor(private citaService: CitasService) { }

  ngOnInit(): void {
    this.listarAllCitas();
  }
  

  listarAllCitas(){
    this.citaService.getAllCitasUsingGET().subscribe(data => {
      this.citas = data;
    })
  }

}
