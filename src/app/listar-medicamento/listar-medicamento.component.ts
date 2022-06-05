import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicamento } from 'app/model/medicamento';

@Component({
  selector: 'listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrls: ['./listar-medicamento.component.css']
})
export class ListarMedicamentoComponent implements OnInit {
  medicamento:Medicamento[]=[]
  pagina=0;
  tamaño=2;
  constructor(private medicamentoService: MedicamentosService) { }

  ngOnInit(): void {
    this.getAllMedicamentos();
    this.pagina= 0;
  }

  getAllMedicamentos(){
    this.medicamentoService.getMedicamentosUsingGET(this.pagina,this.tamaño).subscribe(data=>{
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
}
