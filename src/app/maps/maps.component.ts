import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { TratamientosService } from 'app/api/tratamientos.service';
import { Medicamento } from 'app/model/medicamento';
import { Tratamiento } from 'app/model/tratamiento';
import { data } from 'jquery';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  tratamiento: Tratamiento = {};
  medicamento:Medicamento={};
  idFichaClinica=1 as any;
  public formSubmitted = false;
  // tratamiento:Tratamiento[]=[];
  // tratamiento:Tratamiento;


  constructor(private tratamientosService: TratamientosService, private router: Router, private medicamentoService:MedicamentosService) {
  }

  ngOnInit():void {

  }


  guardarTratamiento(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.tratamiento.id) {
      this.tratamientosService
        .updateUsingPUT4(this.tratamiento, this.tratamiento.id)
        .subscribe((animales) => {
          Swal.fire(
            "Actualizado",
            `¡${this.tratamiento} actualizado con exito!`,
            "success"
          );
          this.irFicha();
        });
    } else {
      this.tratamientosService.createUsingPOST4(this.tratamiento).subscribe(data => {
        this.tratamiento.idFichaClinica.id=data.idFichaClinica.id;
        this.tratamiento.medicacion.id=2;
        this.tratamiento = data;

        Swal.fire(

          "Nuevo Tratamiento",
          `¡${data.id_tratamiento} creada con exito!`,
          "success"
        );
        console.log("imprimiendo", data)
        this.irFicha();
      });
    }
  }

  irFicha() {
    //  this.router.navigateByUrl("/registrofichaclinica");
  }

  FindByNombre(id: string){
    console.log("recibiendo la id de medicamento", id);
    
    this.medicamentoService.getMedicamentoByNombre(id).subscribe(data=>{
      this.medicamento=data;
      console.log("imprimiendo texto a buscar de medicamento",data);
    });
  }

}