import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimalesService } from 'app/api/animales.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { Animal } from 'app/model/animal';
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
  

id:number;
animal:Animal= null;
fichaClinica:fichaClinicaPost={};
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesService,private fichaClinService:FichasClnicasService) { }

  ngOnInit() {
  
  
    const id = this.activatedRoute.snapshot.params.id;
    this.es.getByIdUsingGET(id).subscribe(data =>{
      this.animal= data;
      console.log(data,"data de animal");
      localStorage.setItem('animal', JSON.stringify(this.animal));
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
    this.es.deleteUsingDELETE(id).subscribe(data => {

    })

  }

irVacuna(id:number)
{
  this.es.getByIdUsingGET(id).subscribe(data =>{
    this.animal=data;
  console.log("listado",data);
  this.router.navigate (['/registroCarnet', id]);
  });
 
}


 irAtras(){
    this.router.navigate(['/table-list']);
  }

  modificar(id: number){
    this.es.getByIdUsingGET(id).subscribe(data =>{
      this.animal=data;
    console.log("listado",data);
    this.router.navigate (['/notifications', id]);
    });
  }
  }


