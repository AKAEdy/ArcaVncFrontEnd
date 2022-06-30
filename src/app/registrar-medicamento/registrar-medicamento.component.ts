import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicamento } from 'app/model/medicamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'registrar-medicamento',
  templateUrl: './registrar-medicamento.component.html',
  styleUrls: ['./registrar-medicamento.component.css']
})
export class RegistrarMedicamentoComponent implements OnInit {
 medicamento:Medicamento={}
  constructor(private medicamentoService: MedicamentosService) { }

  createMedicamento(){
     if(this.medicamento.nombreComercial === undefined || this.medicamento.nombreGenerico === undefined || this.medicamento.cantidad === undefined || this.medicamento.precio === undefined ||
      this.medicamento.nombreComercial === '' || this.medicamento.nombreGenerico === '' || this.medicamento.cantidad === null || this.medicamento.cantidad === null ||
      this.medicamento.cantidad === 0 || this.medicamento.cantidad === 0 ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingrese todos los datos!',
        })
    }else{
      Swal.fire({
        title: 'Seguro quiere realizar esta acción?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.medicamentoService.createUsingPOST2(this.medicamento).subscribe(datea => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Persona registrada exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          })
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
        }
      })
    
    }
    
  }
  ngOnInit(): void {
  }

}
