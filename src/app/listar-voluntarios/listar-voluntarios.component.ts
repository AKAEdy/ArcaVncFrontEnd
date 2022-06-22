import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from 'app/api/voluntarios.service';
import { Voluntario } from 'app/model/voluntario';

@Component({
  selector: 'listar-voluntarios',
  templateUrl: './listar-voluntarios.component.html',
  styleUrls: ['./listar-voluntarios.component.css']
})
export class ListarVoluntariosComponent implements OnInit {

  voluntarios: Voluntario[]=[];
  pagina=0;
  tamaño=2;   
  constructor(private voluntarioService:VoluntariosService) { }

  ngOnInit(): void {
    this.getAllVoluntarios()
  }

  getAllVoluntarios(){
   this.voluntarioService.getVoluntariosUsingGET(this.pagina, this.tamaño).subscribe(data =>{
    this.voluntarios = data.content
   })
  }

  next(){
    this.pagina = this.pagina + 1;
  console.log(this.pagina);
  this.getAllVoluntarios();
  }
  
  previous(){
  
    this.pagina = this.pagina - 1;
    if(this.pagina < 0){
      this.pagina = 0;
    }
    
    this.getAllVoluntarios();
  }
}
