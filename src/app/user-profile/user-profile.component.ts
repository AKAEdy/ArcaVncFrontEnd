import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';
import { FichasClnicasService } from 'app/api/fichasClnicas.service';
import { Animal } from 'app/model/animal';
import { FichaClinica } from 'app/model/fichaClinica';
import { Validacion } from 'app/validaciones/Validacion';
import { ViewChild } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';


import Swal from 'sweetalert2';
import { finalize, Observable } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name = 'Angular';
  @ViewChild('MyForm', { static: false }) MyForm: NgForm;

 
  animales:any[] = [];
  validacion: Validacion = new Validacion();
  
  public formSubmitted = false;
  

  animal: Animal={};
// array de string de imagenes
  images: string[];
 
  imgUrl: Observable<string | any>; 
  
  constructor(private animalesService: AnimalesService, private fichasClinicasService: FichasClnicasService, private router: Router,private _formBuilder: FormBuilder,private storage: Storage) {
    this.images = [];
   }

  ngOnInit():void {
    // remuevo datos del animal guarado anteriormente en local storage para poder almacenar uno nuevo
    localStorage.removeItem('animal');

  }
  resetForm() {
    this.MyForm.reset();
  }

  guardarMascota(){

  // console.log("LLEGA "+ this.animal.id,this.animal.nombre,this.animal.sexo, this.animal.especie, this.animal.procedencia, this.animal.lugarEstancia, this.animal.raza, this.animal.peso, this.animal.edad, this.animal.tamanyo, this.animal.fechaNacimiento, this.animal.colorCaracteristicas, this.animal.observacionesProcedencia, this.animal.foto);
    
  if(this.animal.nombre === undefined || this.animal.sexo === undefined || this.animal.especie ===  undefined || this.animal.procedencia === undefined || this.animal.lugarEstancia === undefined || this.animal.raza===  undefined || this.animal.peso=== undefined || this.animal.edad === undefined || this.animal.tamanyo ===  undefined || this.animal.fechaNacimiento === undefined || this.animal.colorCaracteristicas=== undefined || this.animal.observacionesProcedencia ===  undefined || this.animal.foto === undefined  || 



    this.animal.nombre === "" || this.animal.raza === ""   || this.animal.colorCaracteristicas === "" ||this.animal.observacionesProcedencia===""|| this.animal.foto ===""){

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
        this.animalesService.createUsingPOST(this.animal).subscribe(data =>{
          this.animal=data;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se a registrado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          // almaceno los datos del animal para enviar a ficha clinica
          localStorage.setItem('animal', JSON.stringify(this.animal));
          // console.log('imprimiendo valores de la data',);
          
          location.reload();
        });
        this.irFicha();
       
        

        
         
      } else if (result.isDenied) {
        Swal.fire('Acción cancelada', '', 'info')
      }
    }) 
  }
}
  irFicha() {
   this.router.navigateByUrl("/registrofichaclinica");
 }
 irAtras() {
  this.router.navigateByUrl("/menu");
  localStorage.removeItem('animal');
}

 irLista() {
  this.router.navigateByUrl("/TableList");
}

uploadImage($event: any) {
  const file = $event.target.files[0];
  console.log(file);

  const imgRef = ref(this.storage, `images/${file.name}`);

  uploadBytes(imgRef, file)
    .then(response => {
      console.log(response)
      this.getImages(imgRef);

    })

    
}

getImages($event: any) {
  const file = $event.target.files[1];
  const imagesRef = ref(this.storage,`images/${file.name}`);

  listAll(imagesRef)
    .then(async response => {
      console.log(response);
      this.images = [];
      for (let item of response.items) {
        const url = await getDownloadURL(item);
        this.images.push(url);
        console.log(url,"imprimiendo la url de la imagen");
        
      }
    })
    .catch(error => console.log(error));
}

}













