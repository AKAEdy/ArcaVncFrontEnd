import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'app/api/personas.service';
import { Persona } from 'app/model/persona';
import { DataServicesService } from 'app/services/data-services.service';
import { data } from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {
 personas: Persona[] = []
 persona: Persona=null
 pagina=0;
 tamaño=2;
  constructor(private personaService:PersonasService, private dataService: DataServicesService, private router: Router) { }

  ngOnInit(): void {
    this.listarAllPersonas();
  this.pagina = 0;
  this.dataService.getPersonaData().subscribe((persona: Persona) => {
    this.persona = persona
    
  })
  }

  prueba(p:any){
    alert(p)
  }
  editar(persona: Persona){
    // alert(JSON.stringify(persona))
    this.dataService.setPersonaData(persona);
     this.router.navigate(['editar-personas'])
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
