import { Component, OnInit } from '@angular/core';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { Veterinario } from 'app/model/veterinario';

@Component({
  selector: 'registrar-veterinarios',
  templateUrl: './registrar-veterinarios.component.html',
  styleUrls: ['./registrar-veterinarios.component.css']
})
export class RegistrarVeterinariosComponent implements OnInit {
 veterinarios:Veterinario={};
  constructor(private veterinarioService: VeterinariosService) { 
    this.veterinarios.persona = {} 
  }

  ngOnInit(): void {
  }
  createVeterinarios(){
    this.veterinarioService.createUsingPOST6(this.veterinarios).subscribe(data =>{

    })
  }

}
