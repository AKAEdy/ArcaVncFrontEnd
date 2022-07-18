import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicamento } from 'app/model/medicamento';
import { MedicamentoDto } from 'app/model/medicamentoDto';
import Swal from 'sweetalert2';



@Component({
  selector: 'listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrls: ['./listar-medicamento.component.css']
})
export class ListarMedicamentoComponent implements OnInit {
  medicamento: Medicamento[] = []
  medicamentoid: Medicamento = {}
  pagina = 0;
  tamaño = 2;
  constructor(private medicamentoService: MedicamentosService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMedicamentos();
    this.pagina = 0;
  }

  getAllMedicamentos() {
    this.medicamentoService.getMedicamentosUsingGET1(this.pagina, this.tamaño).subscribe(data => {
      this.medicamento = data.content
    })
  }
  getIdMedicamentosById(id : number) {
    console.log(this.medicamentoid)
    this.medicamentoService.getByIdUsingGET3(id).subscribe(data => {
      this.medicamentoid = data
      this.mostrarEditar();
    })
   
  }
  deleteMedicamentos(id :number){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar?',
      text: "No podra revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FE3838',
      cancelButtonColor: '#878787',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.medicamentoService.deleteUsingDELETE3(id).subscribe(data => {
    }),err =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al eliminar la medicacion!',
      })
    }
    Swal.fire(
      'Eliminado!',
      'Registro eliminado exitosamente.',
      'success'
    )
   
    this.getAllMedicamentos();
  }
})

}

  updateMedicamentos(id: number) {
    if (this.medicamentoid.nombreComercial === undefined
      ||this.medicamentoid.nombreGenerico === undefined
      ||this.medicamentoid.cantidad === undefined
      ||this.medicamentoid.precio === undefined
      ||this.medicamentoid.nombreComercial === ""
      || this.medicamentoid.nombreGenerico === "" ) {
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Ingrese todos los datos!',
       })
     } else {
       Swal.fire({
         title: 'Seguro quiererealizar esta acción?',
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: 'Modifica',
         denyButtonText: `No modificar`,
       }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {   
          this.medicamentoService.updateUsingPUT3(this.medicamentoid, id).subscribe(data=>{
          
             Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Medicamento registrado exitosamente',
               showConfirmButton: false,
               timer: 1500
             })
             location.reload();
           }, err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'el medicamento ya a sido registrado!',
            })
          })
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        } 
       })
     }
    
 
  }
    


mostrarEditar(){
  document.getElementById("tarjeta").style.display = "block";
  document.getElementById("tabla").style.display = "none";
}

botonCancelar(){
  document.getElementById("tarjeta").style.display = "none";
  document.getElementById("tabla").style.display = "block";
}
next(){
  this.pagina = this.pagina + 1;
  console.log(this.pagina);
  this.getAllMedicamentos();
}

previous(){

  this.pagina = this.pagina - 1;
  if (this.pagina < 0) {
    this.pagina = 0;
  }

  this.getAllMedicamentos();
  console.log(this.pagina);

}

//medicacion
idmedicamento(id: number){

  localStorage.setItem("idmedicamento", id.toString());

  this.irmedicacion();
}

irmedicacion(){
  this.router.navigateByUrl("/medicacion");
}
 
}
