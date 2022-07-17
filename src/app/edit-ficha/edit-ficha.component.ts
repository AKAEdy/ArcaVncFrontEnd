import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { FichaClinicaDTO } from 'app/model/fichaClinicaDTO';
import { FichaClinicaRequestDTO } from 'app/model/fichaClinicaRequestDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-ficha',
  templateUrl: './edit-ficha.component.html',
  styleUrls: ['./edit-ficha.component.scss']
})
export class EditFichaComponent implements OnInit {
  fichaClinica: FichaClinicaRequestDTO={};
 // fichaClinicaDTO:FichaClinicaDTO={}
  idAnimal:number;
  animal:any={};
animales:any={};
loginUsuario:any={};
  constructor( private activatedRoute: ActivatedRoute,private fichasClinicasService: FichasClnicasService,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.fichasClinicasService.getByIdUsingGET2(id).subscribe(data =>{
      this.fichaClinica= data;
   
    },
      err => {
        this.volver();
      }
    );
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
        this.fichasClinicasService.updateUsingPUT2(this.fichaClinica, this.fichaClinica.id).subscribe(
          (data) => {
         
          this.fichaClinica = data
         
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
      this.volver();
      }

     
  irTratamiento(id: number){
    this.fichasClinicasService.getByIdUsingGET2(id).subscribe(data =>{
      this.fichaClinica=data;
      console.log("lista ficha para tratamiento", data);
    this.router.navigate (['/tratamiento', id]);
    });
    
     
   
   
  }
      volver() {
        this.router.navigate(["/upgrade", this.fichaClinica.id]);
      }
      
}



