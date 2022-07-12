import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AnimalesRefugioService } from 'app/api/animalesRefugio.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';


import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
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

  
 animal: AnimalRefugioResponse=null;
fichaClinica:fichaClinicaPost={};
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesRefugioService,private fichaClinService:FichasClnicasService) { }

  ngOnInit() {
  
  
    const id = this.activatedRoute.snapshot.params.id;
    this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
      this.animal= data.animal;
      console.log(data,"datos de animal");




    //  localStorage.setItem('animal', JSON.stringify(this.animal));


    
      this.getFichaByIdAnimal(id);
   
     
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

  

  irVacuna(id: number){
    this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
      this.animal=data;
    console.log("listado para vacunas", data);
    this.router.navigate (['/registroCarnet', id]);
    });
   
  }


  
  irTratamiento(id: number){
    this.fichaClinService.getByIdUsingGET1(id).subscribe(data =>{
      this.fichaClinica=data;
      console.log("lista ficha para tratamiento", data);
    this.router.navigate (['/tratamiento', id]);
    });
    
     
   
   
  }
  



  }


