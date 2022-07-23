import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { TratamientosService } from 'app/api/tratamientos.service';
import { FichaClinicaDTO } from 'app/model/fichaClinicaDTO';
import { FichaClinicaRequestDTO } from 'app/model/fichaClinicaRequestDTO';
import { TratamientoDto } from 'app/model/tratamientoDto';
import { TratamientoDtoExtends } from 'app/model/tratamientoDtoExtends';
import { Tratamientos } from 'app/models/tratamientos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-ficha',
  templateUrl: './edit-ficha.component.html',
  styleUrls: ['./edit-ficha.component.scss']
})
export class EditFichaComponent implements OnInit {
  fichaClinica: FichaClinicaRequestDTO={};
  tratamientos: Tratamientos;
  tratamientosid: TratamientoDto ={}
  idtratamiento: number;
   // fichaClinicaDTO:FichaClinicaDTO={}
  idAnimal:number;
  idfichatratamiento: number;
  animal:any={};
  animales:any={};
  loginUsuario:any={};

  constructor( private activatedRoute: ActivatedRoute,private fichasClinicasService: FichasClnicasService,
    private router: Router, private  ts: TratamientosService ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.fichasClinicasService.getByIdUsingGET2(id).subscribe(data =>{
      this.fichaClinica= data;
      this.fichaClinica.animalId=data.animal.id;
      this.fichaClinica.personaId=data.veterinario.persona.id;
   
    },
      err => {
        this.volver();
      }
    );

    this.listatratmiento()
  }


  listatratmiento(){
    const id = this.activatedRoute.snapshot.params.id;
    this.ts.findByFichaClinicaUsingGET(id).subscribe(data =>{

      this.tratamientos =data;
      
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  }

  getTratamientoById(id: number){ 
    this.idtratamiento = id
    this.ts.getByIdUsingGET6(id).subscribe(data =>{

      this.tratamientosid=data.Tratamiento;
      console.log('tratamientos' + this.tratamientosid.indicaciones)
    })  
  }
  editarTratamiento(){
    this.ts.updateUsingPUT6(this.tratamientosid, this.fichaClinica.id, this.idtratamiento ).subscribe(data =>{

    })  
  }
  eliminarTratamiento(id: number){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar?',
      text: "No podra revertit los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FE3838',
      cancelButtonColor: '#878787',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ts.deleteUsingDELETE6(id).subscribe(data =>{

        }) 
        Swal.fire(
          'Eliminado!',
          'Registro eliminado exitosamente.',
          'success'
        )
       
      }
    })
    
  }

  modificarFicha(){
    
    Swal.fire({
      title: 'Seguro quiere modificar?',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.warn(this.fichaClinica)
        this.fichasClinicasService.updateUsingPUT2(this.fichaClinica, this.fichaClinica.id).subscribe( data => {
         
          console.log("ruta", data)
          this.fichaClinica = data.data

         this.volver(data.data.animal.id);
         
         }
        , err => {
          console.warn("code", err);
          if(err.error.status === 500){
            console.log(err);
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Llene todos los datos!',
            })
          }
         
        }
        )
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se a modificado exitosamente',
          showConfirmButton: false,
          timer: 1500
          })
       
         
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
     // this.volver();
      }

     
  irTratamiento(id: number){
    this.fichasClinicasService.getByIdUsingGET2(id).subscribe(data =>{
      this.fichaClinica=data;
      console.log("lista ficha para tratamiento", data);
    this.router.navigate (['/tratamiento', id]);
    });
    
     
   
   
  }
  volver(id?: number) {
    id?        this.router.navigateByUrl(`/upgrade/${id}`):this.router.navigateByUrl(`/table-list/`)
  }
      
}



