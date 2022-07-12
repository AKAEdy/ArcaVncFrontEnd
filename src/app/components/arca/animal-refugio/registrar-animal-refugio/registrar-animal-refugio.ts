import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { FichasClnicasService } from "app/api/fichasClnicas.service";
import { Validacion } from "app/validaciones/Validacion";
import { ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import { AnimalRefugioRequest } from "app/model/animalRefugioRequest";
import { AnimalesRefugioService } from "app/api/animalesRefugio.service";

@Component({
  selector: "registrar-animal-refugio",
  templateUrl: "./registrar-animal-refugio.html",
  styleUrls: ["./registrar-animal-refugio.css"],
})
export class RegistrarAnimalRefugioComponent implements OnInit {
  name = "Angular";
  @ViewChild("MyForm", { static: false }) MyForm: NgForm;
  imagen: File = null;

  animales: any[] = [];
  validacion: Validacion = new Validacion();

  public formSubmitted = false;

  imagenPreview: File;
  animal: AnimalRefugioRequest = {};

  constructor(
    private animalesRefugioService: AnimalesRefugioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // remuevo datos del animal guarado anteriormente en local storage para poder almacenar uno nuevo
    localStorage.removeItem("animal");
  }

  resetForm() {
    this.MyForm.reset();
  }

  guardarMascota() {
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
          this.animalesRefugioService
            .guardarAnimalUsingPOSTForm(
              this.animal.colorCaracteristicas,
              this.animal.especie,
              this.animal.lugarEstancia,
              this.animal.nombre,
              this.animal.observacionesProcedencia,
              this.animal.raza,
              this.animal.sexo,
              this.imagen,
              this.animal.adoptado,
              false,
              this.animal.edad,
              this.animal.fechaNacimiento,
              this.animal.peso,
              this.animal.procedencia
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
              this.irFicha();
            });
          
        } else if (result.isDenied) {
          Swal.fire("Acción cancelada", "", "info");
        }
      });
    }
  }
  irFicha() {
    this.router.navigateByUrl("/registrofichaclinica");
  }
  irAtras() {
    this.router.navigateByUrl("/menu");
    localStorage.removeItem("animal");
  }

  irLista() {
    this.router.navigateByUrl("/TableList");
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
