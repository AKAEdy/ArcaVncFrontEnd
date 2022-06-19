import { Component, OnInit } from '@angular/core';
import { VacunasService } from 'app/api/vacunas.service';
import { Vacuna } from 'app/model/vacuna';

@Component({
  selector: 'listar-vacunas',
  templateUrl: './listar-vacunas.component.html',
  styleUrls: ['./listar-vacunas.component.css']
})
export class ListarVacunasComponent implements OnInit {
vacunas: Vacuna[] = [];
  constructor(private vacunaService: VacunasService) { }

  ngOnInit(): void {
    this.getAllVacunas();
  }

  getAllVacunas(){
    this.vacunaService.getVacunasUsingGET().subscribe(date =>
      {
        this.vacunas = date;
        console.log(this.vacunas[0]);
        
      })
  }

}
