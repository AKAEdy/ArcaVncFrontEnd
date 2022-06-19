import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'app/api/personas.service';
import { Persona } from 'app/model/persona';
import { data } from 'jquery';

@Component({
  selector: 'lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {
 personas: Persona[] = []
 pagina=0;
 tamaño=2;
  constructor(private personaService:PersonasService) { }

  ngOnInit(): void {
    this.listarAllPersonas();
  this.pagina = 0;
  }

  listarAllPersonas(){
    
    this.personaService.getPersonasUsingGET1(this.pagina,this.tamaño).subscribe(data =>{
       this.personas = data.content
    })
  }

  next(){
    this.pagina = this.pagina + 1;
  console.log(this.pagina);
  this.listarAllPersonas();
  }

  previous(){

    this.pagina = this.pagina - 1;
    if(this.pagina < 0){
      this.pagina = 0;
    }
    
    this.listarAllPersonas();
  }

}
