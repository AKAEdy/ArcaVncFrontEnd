import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AnimalesRefugioService } from 'app/api/animalesRefugio.service';
import { CarnetsDeVacunacinService } from 'app/api/carnetsDeVacunacin.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';


import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
import { CarnetVacunacion } from 'app/model/carnetVacunacion';
// import { FichaClinicaDTO } from 'app/model/fichaClinicaDTO';
import { fichaClinicaPost } from 'app/model/fichaClinicaPost';
import { data } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  //animal: AnimalRefugioResponse[] = [];
carnetVacuna:CarnetVacunacion={};

animal: AnimalRefugioResponse=null;
fichaClinica:fichaClinicaPost={};

constructor(private activatedRoute: ActivatedRoute, private router: Router,
 private es:AnimalesRefugioService,private fichaClinService:FichasClnicasService,private carnet:CarnetsDeVacunacinService) { }

ngOnInit() {


 const id = this.activatedRoute.snapshot.params.id;
 this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
   this.animal= data.animal;
  
   localStorage.setItem("animal", JSON.stringify(this.animal));
   console.log(data,"datos de animal");




 
   this.getFichaByIdAnimal(id);
 this.getCarnetByIdAnimal(id);
  
 },
   err => {
     this.list();
   }
 );}


 getFichaByIdAnimal(id:number){

   this.fichaClinService.getFichasClinicasByAnimalIdUsingGET1(id).subscribe(data=>{
     this.fichaClinica=data as any;
     console.log(data,"imprimiendo valores de la fichaclinica dentro del metodo get animal");
   });

 }
 getCarnetByIdAnimal(id:number){

   this.carnet.getFichasClinicasByAnimalIdUsingGET(id).subscribe(data=>{
     this.carnetVacuna=data as any;
     console.log(data,"imprimiendo valores de la vacuna dentro del metodo get animal");
   });

 }



list(){ 
 this.router.navigate(['/table-list']);
}
onDelete(id: number) {
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
     Swal.fire(
       'Eliminado!',
       'Registro eliminado exitosamente.',
       'success'
     )
     this.irAtras();
   }
 })
 this.es.eliminarAnimalUsingDELETE(id).subscribe(data => {

 })

}



irFicha(){
 this.router.navigate(['/registrofichaclinica']);
}
irAtras(){
 this.router.navigate(['/table-list']);
}

modificar(id: number){
 this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
   this.animal=data;
 console.log("listado de animal ",data);
 this.router.navigate (['/notifications', id]);
 });
}

irEditarFicha(id:number){
this.fichaClinService.getByIdUsingGET2(id).subscribe(data =>{
  this.fichaClinica=data;
  console.log("dato de ficha para editar", data);
this.router.navigate (['/editFicha', id]);
});
}
irEditarCarnet(id: number){
this.carnet.getByIdUsingGET(id).subscribe(data =>{
  this.carnetVacuna=data;
  console.log("dato de carnet para editar", data);
this.router.navigate (['/editCarnet', id]);
});
}

irVacuna(id: number){
 this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
   this.animal=data;
 console.log("listado para vacunas", data);
 this.router.navigate (['/registroCarnet', id]);
 });

}



irTratamiento(id: number){
 this.fichaClinService.getByIdUsingGET2(id).subscribe(data =>{
   this.fichaClinica=data;
   console.log("lista ficha para tratamiento", data);
 this.router.navigate (['/tratamiento', id]);
 });
 
  


}


borrarFicha(id: number) {
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
     Swal.fire(
       'Eliminado!',
       'Registro eliminado exitosamente.',
       'success'
     )
     this.fichaClinService.deleteUsingDELETE2(id).subscribe(data => {

    })
    
   }
   else if (result.isDenied) {
    Swal.fire('Acción cancelada', '', 'info')
  }
 })


}



borrarVacuna(id: number) {
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
     Swal.fire(
       'Eliminado!',
       'Registro eliminado exitosamente.',
       'success'
     )
     this.carnet.deleteUsingDELETE(id).subscribe(data => {

    })
   
   }
   else if (result.isDenied) {
    Swal.fire('Acción cancelada', '', 'info')
  }
 })


}
}