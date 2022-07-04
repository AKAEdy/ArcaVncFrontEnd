import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { TratamientosService } from 'app/api/tratamientos.service';
import { FichaClinica } from 'app/model/fichaClinica';
import { Medicamento } from 'app/model/medicamento';
import { Tratamiento } from 'app/model/tratamiento';
import { TratamientoDto } from 'app/model/tratamientoDto';
import { data } from 'jquery';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  tratamiento: TratamientoDto = {
    descripcion: '',
    estado: '',
    indicaciones: ''
  };

  idFichaClinica=1 as any;
  public formSubmitted = false;
  // tratamiento:Tratamiento[]=[];
  // tratamiento:Tratamiento;

 fichaClinica:FichaClinica={
   esterilizacion: ''
 };
  constructor(private activatedRoute: ActivatedRoute,private tratamientosService: TratamientosService, private router: Router, private medicamentoService:MedicamentosService, private fichaClinicaS:FichasClnicasService) {
  }

  ngOnInit():void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fichaClinicaS.getByIdUsingGET1(id).subscribe(data =>{
      this.fichaClinica= data;
      console.log(data,"datos ficha");
  });

  }
  

  guardarTratamiento(){    
    if( this.tratamiento.descripcion === undefined || this.tratamiento.descripcion === "" || this.tratamiento.indicaciones === "" ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos!',
      })
    } else{
      Swal.fire({
        title: 'Seguro quiere realizar esta accion??',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log(this.fichaClinica)
          this.tratamientosService.createUsingPOST5(this.tratamiento,this.fichaClinica.id).subscribe(data =>{
            this.tratamiento=data;
            console.log(data, " datos de tratamiento")
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se registrado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          }, err =>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'no hay como generar tratamiento!',
            })
          })
           
        } else if (result.isDenied) {
          Swal.fire('Acción cancelada', '', 'info')
          
        }
      }) 
    }
  }











  irFicha() {
    //  this.router.navigateByUrl("/registrofichaclinica");
  }

  // FindByNombre(id: string){
  //   console.log("recibiendo la id de medicamento", id);
    
  //   this.medicamentoService.getMedicamentoByNombre(id).subscribe(data=>{
  //     this.medicamento=data;
  //     console.log("imprimiendo texto a buscar de medicamento",data);
  //   });
  // }

}