import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicamento } from 'app/model/medicamento';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrls: ['./listar-medicamento.component.css']
})
export class ListarMedicamentoComponent implements OnInit {
  medicamento:Medicamento[]=[]
  medicamentoid: Medicamento={} 
  pagina=0;
  tamaño=2;
  constructor(private medicamentoService: MedicamentosService) { }

  ngOnInit(): void {
    this.getAllMedicamentos();
    this.pagina= 0;
  }

  getAllMedicamentos(){
    this.medicamentoService.getMedicamentosUsingGET1(this.pagina,this.tamaño).subscribe(data=>{
this.medicamento=data.content
    })
  }
  updateMedicamentos(){
    
    this.medicamentoService.updateUsingPUT3(this.medicamentoid, this.medicamentoid.id).subscribe(data=>{
    })
  }
  getMedicamentosById(id: number){
    this.medicamentoService.getByIdUsingGET3(id).subscribe(data=>{
      this.medicamentoid=data
      this.mostrarEditar();
    })
  }
  
  deleteMedicamentos(id: number){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar?',
      text: "No podra revertit los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FE3838',
      cancelButtonColor: '#878787',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Registro eliminado exitosamente.',
          'success'
        )
        this.getAllMedicamentos();
      }
    })
    this.medicamentoService.deleteUsingDELETE3(id).subscribe(data=>{
      
    })

  }
  botonCancelar(){
    document.getElementById('tarjeta').style.display='none'
    document.getElementById('tabla').style.display='block'
  }
  mostrarEditar(){
    document.getElementById('tarjeta').style.display='block'
    document.getElementById('tabla').style.display='none'
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
