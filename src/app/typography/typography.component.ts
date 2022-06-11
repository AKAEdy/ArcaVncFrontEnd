import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicacionesService } from 'app/api/medicaciones.service';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicacion } from 'app/model/medicacion';
import { Medicamento } from 'app/model/medicamento';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
//public medicacion = new Medicacion();
public formSubmitted = false;
  public medicamentos: Medicamento[] = [];
 
  medicacion: Medicacion={};
 medicamento:Medicamento={};

 public medicamentosFiltrados: Observable<Medicamento[]>;
  constructor(private medicacionesService: MedicacionesService, private medicamentosService:MedicamentosService,  private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedicacion(id));
    this.cargarMedicamento();


  }


//   guardarMedicacion(form: NgForm) {
//     this.formSubmitted = true;
//     if (form.invalid) {
//       return;
//     } 
//     if (this.medicacion.id) {
//       this.medicacionesService
//         .crearMedicacionUsingPOST(this.medicacion.id)
//         .subscribe((medicaciones) => {
//           Swal.fire(
//             "Actualizar medicamento",
//             `¡${this.medicacion.id} actualizado con exito!`,
//             "success"
//           );
//           this.irFicha();
//         });
//       }else {
//       //  console.log("LLEGA "+ this.animal.nombre,this.animal.especie,this.animal.raza, this.animal.peso, this.animal.color, this.animal.sexo, this.animal.tamanyo, this.animal.edad);
   
//       this.medicacionesService.crearMedicacionUsingPOST(this.medicacion.id).subscribe(data => {
//         this.medicacion.medicamento.id=data.medicamento.id;
//         this.medicacion=data;
        
//         Swal.fire(

//          "Nueva",
//          `¡${data.id} creada con exito!`,
//           "success"
//         );
//         console.log("imprimiendo", data)
//        this.irFicha();
//      });
//    } }

//   irFicha() {
//   // this.router.navigateByUrl("/registrofichaclinica");
//  }
//  FindByNombre(id: string){
//   console.log("recibiendo la id de medicamento", id);
  
//   this.medicamentosService.getMedicamentoByNombre(id).subscribe(data=>{
//     this.medicamento=data;
//     console.log("imprimiendo texto a buscar de medicamento",data);
//   });
// }










cargarMedicamento() {
  this.medicamentosService.getMedicamentosUsingGET().subscribe((medicamentos) => {
    this.medicamentos= medicamentos;
  });
}



guardar(form: NgForm) {
  this.formSubmitted = true;
  if (form.invalid) {
    return;
  }
  if (this.medicacion.id) {
    this.medicacionesService.crearMedicacionUsingPOST( this.medicacion.id)
      .subscribe((medicacion) => {
 
        Swal.fire(
          "Actualizado ",
          `¡${ this.medicacion.id
        } actualizada con exito!`,
          "success"

        );
        this.irListaResponsablePPP();
      });

  }else {
    
    this.medicacionesService.crearMedicacionUsingPOST(this.medicacion.id).subscribe((medicacion) => {
      Swal.fire(
        "Nuevo (a) ",
        `¡${this.medicacion.id
          } creada con exito!`,
        "success"
      );
      this.irListaResponsablePPP();
    });
  }
}


irListaResponsablePPP() {
  //this.router.navigateByUrl("/dashboard/responsablesppp");
}

compararMedicamento(m1: Medicamento, m2: Medicamento) {
  if (m1 === undefined && m2 === undefined) {
    return true;
  }
  return m1 == null || m2 == null ? false : m1.id === m2.id;
}


cargarMedicacion(id: number) {
  if (!id) {
    return;
  }
  this.medicacionesService.getMedicacionPorIdUsingGET(id).subscribe((medicacion) => {
    if (!medicacion) {
      return this.irListaResponsablePPP();
    }
    this.medicacion= medicacion;
  });
}



}
