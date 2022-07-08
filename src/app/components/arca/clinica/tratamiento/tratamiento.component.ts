import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { MedicacionesService } from 'app/api/medicaciones.service';
import { MedicamentosService } from 'app/api/medicamentos.service';
import { TratamientosService } from 'app/api/tratamientos.service';
import { FichaClinica } from 'app/model/fichaClinica';
import { Medicacion } from 'app/model/medicacion';
import { Medicamento } from 'app/model/medicamento';
import { TratamientoDto } from 'app/model/tratamientoDto';
import { event } from 'jquery';
import { filter } from 'rxjs-compat/operator/filter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {
  tratamiento: TratamientoDto = {
    descripcion: '',
    estado: '',
    indicaciones: ''
  };

  idFichaClinica=1 as any;
  medicamentos : Medicamento[]=[];
  medicaciones : Medicacion[]=[];
  public formSubmitted = false;
  filterpost : any ='';

 fichaClinica:FichaClinica={
   esterilizacion: ''
 };
  constructor(private activatedRoute: ActivatedRoute,private tratamientosService: TratamientosService, private router: Router, private medicamentoService:MedicamentosService, private fichaClinicaS:FichasClnicasService, private medicacionService:MedicacionesService) {
  }

  ngOnInit():void {
    //this.listarMedicamentos();
    const id = this.activatedRoute.snapshot.params.id;
    this.fichaClinicaS.getByIdUsingGET1(id).subscribe(data =>{
      this.fichaClinica= data;
      console.log(data,"datos ficha");
    //this.filterpost = this.medicaciones;
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

  listarMedicamentos(){
    this.medicacionService.getAllMedicacionsUsingGET().subscribe(data =>{
      this.medicaciones = data
    })
  }

  validarInputs(event){
    //alert("Guardado");
    //console.log("tamaño" + this.filterpost.length);
    let teclaBorrar = event.keyCode
    if (teclaBorrar == 8) {
      alert("Guardado");
    }
    if (this.filterpost.length > 0) {
      //this.listarMedicamentos();
      //this.filterpost = ''
      console.log("variable: "+ this.filterpost.length);
     //this.filterpost = undefined;
    }

    else {

      this.listarMedicamentos();
    }
  }

}