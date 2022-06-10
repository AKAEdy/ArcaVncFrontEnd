import { Component, OnInit } from '@angular/core';
import { VeterinariosService } from 'app/api/veterinarios.service';
import { Veterinario } from 'app/model/veterinario';
import { data } from 'jquery';

@Component({
  selector: 'listar-veterinarios',
  templateUrl: './listar-veterinarios.component.html',
  styleUrls: ['./listar-veterinarios.component.css']
})
export class ListarVeterinariosComponent implements OnInit {
veterinarios: Veterinario[]=[];
pagina=0;
tamaño=2;
  constructor(private veterinarioService: VeterinariosService) { }

  ngOnInit(): void {
 
    // this.tamaño=2;]
    this.getAllVeterinarios();
    this.pagina=0;
  }
 getAllVeterinarios(){
   this.veterinarioService.getVeterinariosUsingGET(this.pagina, this.tamaño).subscribe(data =>{
   this.veterinarios = data.content
   })
 }

 next(){
  this.pagina = this.pagina + 1;
console.log(this.pagina);
this.getAllVeterinarios();
}

previous(){

  this.pagina = this.pagina - 1;
  if(this.pagina < 0){
    this.pagina = 0;
  }
  
  this.getAllVeterinarios();
}

}
