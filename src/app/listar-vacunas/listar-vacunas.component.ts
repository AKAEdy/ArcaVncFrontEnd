import { Component, OnInit } from '@angular/core';
import { VacunasService } from 'app/api/vacunas.service';
import { Vacuna } from 'app/model/vacuna';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-vacunas',
  templateUrl: './listar-vacunas.component.html',
  styleUrls: ['./listar-vacunas.component.css']
})
export class ListarVacunasComponent implements OnInit {
  vacunas: Vacuna[] = [];
  vacunasid: Vacuna = {}
  constructor(private vacunaService: VacunasService) { }

  ngOnInit(): void {
    this.getAllVacunas();
  }

  getAllVacunas() {
    this.vacunaService.getVacunasUsingGET().subscribe(data => {
      this.vacunas = data;
      console.log(this.vacunas[0]);

    })
  }
  updateVacunas() {
    if(this.vacunasid.nombre === undefined || this.vacunasid.tipo === undefined || this.vacunasid.descripcion === undefined
      || this.vacunasid.nombre === '' || this.vacunasid.tipo === '' || this.vacunasid.descripcion === ''){
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
        confirmButtonText: 'Modificar',
        denyButtonText: `No modificar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.vacunaService.updateUsingPUT7(this.vacunasid, this.vacunasid.id).subscribe(data =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Vacuna modificada exitosamente',
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
  getVacunasById(id: number) {
    this.vacunaService.getByIdUsingGET7(id).subscribe(data => {
      this.vacunasid = data
      this.mostrarEditar()
      console.log(id);


    })
  }
  deleteVacunas(id: number) {
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
        this.getAllVacunas();
      }
    })
    this.vacunaService.deleteUsingDELETE7(id).subscribe(data => {

    })

  }
  botonCancelar() {
    document.getElementById('tarjeta').style.display = 'none'
    document.getElementById('tabla').style.display = 'block'
  }
  mostrarEditar() {
    document.getElementById('tarjeta').style.display = 'block'
    document.getElementById('tabla').style.display = 'none'
  }
}


