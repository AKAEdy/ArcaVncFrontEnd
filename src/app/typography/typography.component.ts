import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicacionesService } from 'app/api/medicaciones.service';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { Medicacion } from 'app/model/medicacion';
import { Medicamento } from 'app/model/medicamento';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { MedicacionDto } from 'app/model/medicacionDto';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
//public medicacion = new Medicacion();
  public formSubmitted = false;
  medicamentos: Medicamento[] = [];
  nombre_medicamentos: Medicamento = {};
  nombrecomercial: string;
  medicacionpost:Medicacion= {
    descripcionMd: '',
    dosis: '',
    duracion: '',
    frecuencia: '',
    tratamiento: undefined
  }

  m : MedicacionDto = {
    descripcionMd: '',
    dosis: '',
    duracion: '',
    frecuencia: '',
  };

  fechamedicacion: Date;

  constructor(private router: Router, private medicacionesService: MedicacionesService, private medicamentosService:MedicamentosService,  private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(({ id }) => this.cargarMedicacion(id));
    // this.cargarMedicamento();
    this.listanombremedicamentos();
  }

  listanombremedicamentos(){
  var medicamento_id = parseInt (localStorage.getItem("idmedicamento"));
  this.medicamentosService.getByIdUsingGET2(medicamento_id).subscribe(data =>{
    this.nombre_medicamentos =data;
    this.nombrecomercial = this.nombre_medicamentos.nombreComercial
  })
}

guardarmedicion(){

  /*if(this.m.descripcionMd === undefined || this.m.dosis === undefined || this.m.duracion === undefined || this.m.fechaCaducidad === undefined || this.m.frecuencia === undefined ||
     this.m.descripcionMd === '' || this.m.dosis === '' || this.m.duracion === '' ||this.m.frecuencia){

      Swal.fire('LLENAR CAMPOS')

  }else{}*/

    var medicamento_id = parseInt (localStorage.getItem("idmedicamento"));
    this.medicacionesService.crearMedicacionUsingPOST(this.m, medicamento_id,1).subscribe(data =>{

  })
    Swal.fire('REGISTRADO EXITOSAMENTE')

  
  
}

regresarlistamedicamentos(){
  this.router.navigate(['listaMedicamentos'])
}

}
