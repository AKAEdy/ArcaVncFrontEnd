import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { AnimalesRefugioService } from 'app/api/animalesRefugio.service';
import { Animal } from 'app/model/animal';
import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
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
imagen: File = null;

animales: any[] = [];
animal: AnimalRefugioResponse={};
imagenPreview: File;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private es:AnimalesRefugioService) { }
    
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.es.getAnimalPorIdUsingGET(id).subscribe(data =>{
      this.animal= data.animal;
   
    },
      err => {
        this.volver();
      }
    );}

  



  volver(){
    this.router.navigate(['/table-list']);
  }



 
  modificarAnimal()  {

    if (
      this.animal.nombre === undefined ||
      this.animal.sexo === undefined ||
      this.animal.especie === undefined ||
      this.animal.procedencia === undefined ||
      this.animal.lugarEstancia === undefined ||
      this.animal.raza === undefined ||
      this.animal.peso === undefined ||
      this.animal.edad === undefined ||
      this.animal.fechaNacimiento === undefined ||
      this.animal.colorCaracteristicas === undefined ||
      this.animal.observacionesProcedencia === undefined ||
      this.animal.nombre === "" ||
      this.animal.raza === "" ||
      this.animal.colorCaracteristicas === "" ||
      this.animal.observacionesProcedencia === "" ||
      this.imagen == null
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Llene todos los campos!",
      });
    } else {
      Swal.fire({
        title: "Seguro quiere realizar esta accion??",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.es.actualizarAnimalUsingPUT
           (
              this.animal.colorCaracteristicas,
              this.animal.especie,
              this.animal.id,
              this.animal.lugarEstancia,
              this.animal.nombre,
              this.animal.observacionesProcedencia,
              this.animal.procedencia,
              this.animal.raza,
              this.animal.sexo,
         
              this.animal.adoptado,
              this.animal.edad,
              this.animal.fechaNacimiento,
              this.animal.peso
            )
            .subscribe((data) => {
              this.animal = data;
              console.log("datos enviados", data);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Se a registrado correctamente",
                showConfirmButton: false,
                timer: 1500,
              });

              localStorage.setItem("animal", JSON.stringify(this.animal));
             
            });
          
        } else if (result.isDenied) {
          Swal.fire("Acción cancelada", "", "info");
        }
      });
    }
  }
  capturarImagen(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenPreview = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
    console.log(this.imagen);
  }
}


  //   if(this.animal.nombre === undefined || this.animal.sexo === undefined || this.animal.especie ===  undefined || this.animal.procedencia === undefined || this.animal.lugarEstancia === undefined || this.animal.raza===  undefined || this.animal.peso=== undefined || this.animal.edad === undefined || this.animal.tamanyo ===  undefined || this.animal.fechaNacimiento === undefined || this.animal.colorCaracteristicas=== undefined || this.animal.observacionesProcedencia ===  undefined || this.animal.foto === undefined  || 



  //   this.animal.nombre === "" || this.animal.raza === ""   || this.animal.colorCaracteristicas === "" ||this.animal.observacionesProcedencia===""|| this.animal.foto ===""){

  //       Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Ingrese todos los datos!',
  //     })
  //   } else {
  //     Swal.fire({
  //       title: 'Seguro quiere realizar esta acción?',
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: 'Modificar',
  //       denyButtonText: `No modificar`,
  //     }).then((result) => {
  //       /* Read more about isConfirmed, isDenied below */
  //       if (result.isConfirmed) {
  //         this.es.actualizarAnimalUsingPUT(this.animal, this.animal.id).subscribe(data => {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'success',
  //             title: 'Mascota registrada exitosamente',
  //             showConfirmButton: false,
  //             timer: 1500
  //           })
  //           location.reload();
  //         })     
  //         this.volver();    
  //       }
  //       else if (result.isDenied) {
  //         Swal.fire('Acción cancelada', '', 'info')
  //       }
  //     })
  //   }

  // }

