import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEvent } from 'app/alarm/interfaces/type-event';
import { CarnetsDeVacunacinService } from 'app/api/carnetsDeVacunacin.service';
import { VacunasService } from 'app/api/vacunas.service';
import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
import { CarnetVacunacion } from 'app/model/carnetVacunacion';
import { CarnetVacunacionDTO } from 'app/model/carnetVacunacionDTO';
import { Vacuna } from 'app/model/vacuna';
import { AlarmService } from 'app/service/alarm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-carnet',
  templateUrl: './edit-carnet.component.html',
  styleUrls: ['./edit-carnet.component.scss']
})
export class EditCarnetComponent implements OnInit {
  vacunas:Vacuna[] = [];
  selectedvacunas: Vacuna = {};
  carnetVacuna: CarnetVacunacionDTO={};
  animal: AnimalRefugioResponse = {};
  constructor(private carnet:CarnetsDeVacunacinService,private activatedRoute: ActivatedRoute, private router: Router,private vacunaServic: VacunasService,private _alarmService:AlarmService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.carnet.getByIdUsingGET(id).subscribe(data =>{
      this.carnetVacuna= data;
   
    },
      err => {
        this.volver();
      }
    );
    this.getAllVacunas();

  }




  volver(){
    this.router.navigate(["/upgrade",this.carnetVacuna.animal.id]);
  }



getAllVacunas() {
  this.vacunaServic.getVacunasUsingGET().subscribe((data) => {
    this.vacunas = data;
    console.log(data);
  });
}
modificarCarnet(){
 // this.carnetVacuna.animal = this.animal;
  //  console.log(this.vacuna,"mostrar objeto vacuna");
  // console.log(JSON.stringify(this.selectedvacunas),"imprimiendo objeto convertido");
  console.log(this.carnetVacuna);
  this.carnetVacuna.vacuna=this.selectedvacunas;
 
  this.carnet.updateUsingPUT(this.carnetVacuna, this.carnetVacuna.id ).subscribe(
    (data) => {
     
      this.carnetVacuna=data.carnetVacunacion;
  
      console.warn( "guardando carnet", data);
      this.volver();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se a modificado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }, (error) => {
     // this.carnetVacuna = {};
      console.error(error);
    },
    () => {
      this.onComplete(this.carnetVacuna);
     
     
    }
   
  );
  
}

onComplete(cv:CarnetVacunacion): void {
  this._alarmService.save({
    ...{
      checked: false,
      body: "",
      eventType: TypeEvent.VACUNA,
      eventDay: cv.fechaProximaAplicacion,
      pacienteId: cv.animal?.id,
    },
  });
}
}
