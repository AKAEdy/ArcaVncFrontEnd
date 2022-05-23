import { Component, OnInit } from '@angular/core';
import { Adopciones } from 'app/models/adopciones';

@Component({
  selector: 'registrar-adoptado',
  templateUrl: './registrar-adoptado.component.html',
  styleUrls: ['./registrar-adoptado.component.css']
})
export class RegistrarAdoptadoComponent implements OnInit {
  adopciones = Adopciones
  nombrePersona: string;
  nombreAnimal: string;
  fechaAdop: string;
  descripcionAdop: string;
  constructor() {

  }


  ngOnInit(): void {
    
  }

}
