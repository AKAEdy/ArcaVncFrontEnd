import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonasService } from "app/api/personas.service";
import { RolesService } from "app/api/roles.service";
import { UsuariosService } from "app/api/usuarios.service";
import { VeterinariosService } from "app/api/veterinarios.service";
import { VoluntariosService } from "app/api/voluntarios.service";
import { PersonaDtoExtends } from "app/model/personaDtoExtends";
import { RolDto } from "app/model/rolDto";
import { UsuarioDtoExtends } from "app/model/usuarioDtoExtends";
import { VeterinarioDTO } from "app/model/veterinarioDTO";
import { VoluntarioDto } from "app/model/voluntarioDto";
import Swal from "sweetalert2";

@Component({
  selector: "app-registrar-usuarios",
  templateUrl: "./registrar-usuarios.component.html",
  styleUrls: ["./registrar-usuarios.component.css"],
})
export class RegistrarUsuariosComponent implements OnInit {
  usuarios?: UsuarioDtoExtends = {};
  persona?: PersonaDtoExtends = {};
  veterinario?: VeterinarioDTO = {};
  voluntario?: VoluntarioDto = {};
  rol?: Array<RolDto>;
  cedula?: string;
  roles?: RolDto;
  actividad?: string;
  tipo?: string;
  cargo?: string;
  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private personaService: PersonasService,
    private rolService: RolesService,
    private veterinarioService: VeterinariosService,
    private voluntarioService: VoluntariosService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    document.getElementById("spinner").style.display = "none";
  }

  delays(n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  async createUsuarios() {
    if (
      this.cedula === undefined ||
      this.persona.nombre === undefined ||
      this.persona.apellidos === undefined ||
      this.persona.correo === undefined ||
      this.persona.telefono === undefined ||
      this.persona.celular === undefined ||
      this.persona.direccion === undefined ||
      this.cedula === "" ||
      this.persona.nombre === "" ||
      this.persona.apellidos === "" ||
      this.persona.correo === "" ||
      this.persona.telefono === "" ||
      this.persona.celular === "" ||
      this.persona.direccion === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese todos los datos!",
      });
    } else {
      // METODO PARA CREAR UN VETERINARIO
      if (this.roles.nombre === "ROLE_VETERINARIO") {
        document.getElementById("spinner").style.display = "block";
        this.createVeterinario();
        // METODO PARA CREAR USUARIO
        await this.delays(1);
        this.buscarPersonaByCedula();
        await this.delays(1);
        this.usuarioService
          .createUsingPOST7(
            (this.usuarios = {
              id: 0,
              password: this.cedula,
              persona: this.persona,
              roles: [this.roles],
              username: this.persona.correo,
            })
          )
          .subscribe((data) => {
            this.usuarios = data;
          });
        document.getElementById("spinner").style.display = "none";
               Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario registrado exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
            await this.delays(2);
            // location.reload()
      }
    }

    // METODO PARA CREAR UN VOLUNTARIO ---------------
    if (this.roles.nombre === "ROLE_DEFAULT_USER") {
      document.getElementById("spinner").style.display = "block";
      this.createVoluntario();
      // METODO PARA CREAR USUARIO
      await this.delays(1);
      this.buscarPersonaByCedula();
      await this.delays(1);
      this.usuarioService
        .createUsingPOST7(
          (this.usuarios = {
            id: 0,
            password: this.cedula,
            persona: this.persona,
            roles: [this.roles],
            username: this.persona.correo,
          })
        )
        .subscribe((data) => {
          this.usuarios = data;
        });
      document.getElementById("spinner").style.display = "none";
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      await this.delays(2);
      location.reload()
    }

    // METODO PARA CREAR UN ADMIN --------------
    if (this.roles.nombre === "ROLE_ADMIN") {
      document.getElementById("spinner").style.display = "block";
      this.createPersona();
      // METODO PARA CREAR USUARIO
      await this.delays(1);
      this.buscarPersonaByCedula();
      await this.delays(1);
      this.usuarioService
        .createUsingPOST7(
          (this.usuarios = {
            id: 0,
            password: this.cedula,
            persona: this.persona,
            roles: [this.roles],
            username: this.persona.correo,
          })
        )
        .subscribe((data) => {
          this.usuarios = data;
        });
      document.getElementById("spinner").style.display = "none";
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
      await this.delays(2);
      location.reload()
    }
  }

  createVeterinario() {
       this.veterinarioService
      .createUsingPOST9(
        (this.veterinario = {
          cargo: this.cargo,
          id: 0,
          persona: {
            apellidos: this.persona.apellidos,
            cedula: this.cedula,
            celular: this.persona.celular,
            correo: this.persona.correo,
            direccion: this.persona.direccion,
            id: 0,
            nombre: this.persona.nombre,
            telefono: this.persona.telefono,
          },
        })
      )
      .subscribe((data) => {
      });
  }

  async createVoluntario() {
    this.voluntario.actividad = this.actividad;
    this.voluntario.tipo = this.tipo;
    this.voluntario.cedula = this.cedula;
    this.voluntario.nombre = this.persona.nombre;
    this.voluntario.apellidos = this.persona.apellidos;
    this.voluntario.celular = this.persona.celular;
    this.voluntario.correo = this.persona.correo;
    this.voluntario.direccion = this.persona.direccion;
    this.voluntario.telefono = this.persona.telefono;

    this.voluntarioService
      .createUsingPOST10(this.voluntario)
      .subscribe((data) => {});
  }

  createPersona() {
    this.persona.cedula = this.cedula;
    this.personaService.createUsingPOST4(this.persona).subscribe((data) => {
      this.persona = data;
    });
  }
  mostrarRoles() {
    if (this.roles.nombre === "ROLE_DEFAULT_USER") {
      document.getElementById("opcion1").style.display = "Block";
      document.getElementById("opcion2").style.display = "Block";
      document.getElementById("opcion3").style.display = "none";
    }

    if (this.roles.nombre === "ROLE_VETERINARIO") {
      document.getElementById("opcion1").style.display = "none";
      document.getElementById("opcion2").style.display = "none";
      document.getElementById("opcion3").style.display = "Block";
    }

    if (this.roles.nombre === "ROLE_ADMIN") {
      document.getElementById("opcion1").style.display = "none";
      document.getElementById("opcion2").style.display = "none";
      document.getElementById("opcion3").style.display = "none";
    }
  }

  buscarPersonaByCedula() {
    this.personaService
      .getPersonasUsingGET1(0, 1, this.cedula)
      .subscribe((data) => {
        this.persona = data.content[0] ?? {};
        if (data.content.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Persona no encontrada!",
          });
          this.persona = {};
        }
      });
  }

  getRoles() {
    this.rolService.getRolesUsingGET().subscribe((data) => {
      this.rol = data;
    });
  }


  irAgregarPersona() {
    this.router.navigateByUrl("/registroPersonas");
  }
}
