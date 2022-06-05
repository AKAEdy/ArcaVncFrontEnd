import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicamentosService } from 'app/api/medicamentos.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
// ListarMedicamento(nombre:string){
    // this.medicamentosService

// }
}