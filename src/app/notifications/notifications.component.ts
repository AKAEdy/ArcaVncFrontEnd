import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  // [form: any = {};
  // actualizado = false;
  // failActualizado = false;
  // msjErr = '';
  // msjOK = '';
  // failInit = false;]
//2
animal: Animal={};

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesService) { }
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.es.getByIdUsingGET(id).subscribe(data =>{
      this.animal= data;
   
    },
      err => {
        this.volver();
      }
    );}

  

 
    // const id = this.activatedRoute.snapshot.params.id;
    // this.es.getByIdUsingGET(id).subscribe( data => {
    //   this.form.nombre = data.nombre;
    //   this.form.sexo = data.sexo;
    //   this.form.especie = data.especie;
    //   this.form.procedencia = data.procedencia;
    //   this.form.lugarEstancia = data.lugarEstancia;
    //   this.form.raza = data.raza;
    //   this.form.peso = data.peso;
    //   this.form.edad = data.edad;
    //   this.form.tamanyo = data.tamanyo;
    //   this.form.fechaNacimiento = data.fechaNacimiento;
    //   this.form.colorCaracteristicas = data.colorCaracteristicas;
    //   this.form.observacionesProcedencia = data.observacionesProcedencia;
    //   this.form.foto = data.foto;

  //   },
  //   (err: any) => {
  //     this.failInit = true;
  //     this.router.navigate(['/table-list']);
  //   }
  // );
  
modificar(){
  if (this.animal.id) {
    this.es
      .updateUsingPUT(this.animal, this.animal.id)
      .subscribe((animales) => {
        Swal.fire(
          "Actualizar mascota",
          `¡${this.animal.nombre} actualizado con exito!`,
          "success"
        );
        this.volver();
      });
    }}


  volver(){
    this.router.navigate(['/table-list']);
  }

  // onUpdate(): void {
  //   const id = this.activatedRoute.snapshot.params.id;
  //   this.es.updateUsingPUT(this.form, id).subscribe( data => {
  //     this.actualizado = true;
  //     this.failActualizado = false;
  //     this.msjOK = data.mensaje;
  //   },
  //   (err: any) => {
  //     this.actualizado = false;
  //     this.failActualizado = true;
  //     this.msjErr = err.error.mensaje;
  //   }
  //   );
  // }

}
