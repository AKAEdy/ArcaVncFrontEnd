import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicamento } from 'app/model/medicamento';
import { Router } from '@angular/router';

@Component({
  selector: 'listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrls: ['./listar-medicamento.component.css']
})
export class ListarMedicamentoComponent implements OnInit {
  medicamento:Medicamento[]=[]
  pagina=0;
  tamaño=2;
  constructor(private medicamentoService: MedicamentosService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMedicamentos();
    this.pagina= 0;
  }

  getAllMedicamentos(){
    this.medicamentoService.getMedicamentosUsingGET1(this.pagina,this.tamaño).subscribe(data=>{
this.medicamento=data.content
    })
  }

  next(){
    this.pagina = this.pagina + 1;
  console.log(this.pagina);
  this.getAllMedicamentos();
  }

  previous(){

    this.pagina = this.pagina - 1;
    if(this.pagina < 0){
      this.pagina = 0;
    }
    
    this.getAllMedicamentos();
    console.log(this.pagina);
 
  }

  //medicacion
  idmedicamento(id:number){
  
    localStorage.setItem("idmedicamento", id.toString());

    this.irmedicacion();
  }

  irmedicacion(){
    this.router.navigateByUrl("/medicacion");
  }
}
