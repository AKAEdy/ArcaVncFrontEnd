import { Component, OnInit } from '@angular/core';
import { MedicacionesService } from 'app/api/medicaciones.service';

@Component({
  selector: 'lista-medicacion',
  templateUrl: './lista-medicacion.component.html',
  styleUrls: ['./lista-medicacion.component.css']
})
export class ListaMedicacionComponent implements OnInit {

  constructor(private medicacionservice: MedicacionesService) { }

  ngOnInit(): void {
  }

  listarmedicaciones(){

    
  }

}
