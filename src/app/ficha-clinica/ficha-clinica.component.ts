import { Component, OnInit } from '@angular/core';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { Animal } from 'app/model/animal';
import { FichaClinica } from 'app/model/fichaClinica';
import { Veterinario } from 'app/model/veterinario';
import Swal from 'sweetalert2';

@Component({
  selector: 'ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {
  
  //animal: Animal={}
//veterinario: Veterinario={};
//fichaClinica: FichaClinica={};
  constructor(private fichasClnicas: FichasClnicasService) { }

  ngOnInit(): void {



  }


  guardar(){
   // console.log("LLEGA "+ this.veterinario.id,this.fichaClnica.id..id,this..descripcion, this.adopcion.fechaAdopcion);
    
//     if(this.adoptante.id ===  undefined || this.animal.id === undefined || this.adopcion.descripcion === undefined || this.adopcion.descripcion === "" || this.adopcion.fechaAdopcion === ""  || this.adopcion.fechaAdopcion === undefined){
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Llenne todos los campos!',
//       })
//     } else{
//       this.fichasClnicas..G(this.adoptante.id,this.animal.id,this.adopcion.descripcion, this.adopcion.fechaAdopcion).subscribe(data =>{
//         console.log("LOS DATOS"+data);
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Se a adoptado correctamente',
//           showConfirmButton: false,
//           timer: 1500
//         })
//       })
//     }
  
//   }

// }


// }
}}