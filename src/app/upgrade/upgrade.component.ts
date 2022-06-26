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
      localStorage.setItem('animal', JSON.stringify(this.animal));
    },
      err => {
        this.list();
      }
    );}



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


