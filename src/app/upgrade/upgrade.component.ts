import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';
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
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesService) { }

  ngOnInit() {
  
  
    const id = this.activatedRoute.snapshot.params.id;
    this.es.getByIdUsingGET(id).subscribe(data =>{
      this.animal= data;
   
    },
      err => {
        this.list();
      }
    );}



  
  // }
  //   this.id = this.route.snapshot.params['id'];

  //   this.es.getByIdUsingGET(this.id)
  //     .subscribe(data => {
  //       console.log(data)
  //       this.animal = data;
  //     }, error => console.log(error));
  // }

  list(){
    this.router.navigate(['/table-list']);
  }
  onDelete(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.es.deleteUsingDELETE(id).subscribe(data =>{

        this.list();

     
      });
    }
    else{
      Swal.fire(
        "No se puede borrar revise las foraneas"
     
      );
    }
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


