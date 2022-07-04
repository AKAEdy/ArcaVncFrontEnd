import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { AdoptanteControllerService } from 'app/api/adoptanteController.service';
import { SeguimientoDeAdoptadosService } from 'app/api/seguimientoDeAdoptados.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
import { SeguimientoAdopcion } from 'app/model/seguimientoAdopcion';
import { SeguimientoAdopcionDto } from 'app/model/seguimientoAdopcionDto';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'registrar-seguimiento',
  templateUrl: './registrar-seguimiento.component.html',
  styleUrls: ['./registrar-seguimiento.component.css']
})
export class RegistrarSeguimientoComponent implements OnInit {


  filterpost:any='';
  adopcion:Adopcion[]=[];
  dataSource: any ={};
  adopcionid:Adopcion ={};
  adoptante: Adoptante = {};
  cedulas: string;
  descripcion:string;
  nombreadoptante:string;
  correoadoptante:string;
  telefonoadoptante:string;
  direcionadoptante:string;
  fecha = new Date().toLocaleDateString();
  seguimientoAdopcion:SeguimientoAdopcion={
    estadoSeguimiento: false,
    fechaSeguimiento: undefined,
    mensajeSeguimiento: ''
  };
  mensaje:string;
  historial:SeguimientoAdopcionDto[]=[]
  activos:SeguimientoAdopcion[]=[]
  editarActivos:SeguimientoAdopcionDto={
    estadoSeguimiento: false,
    fechaSeguimiento: undefined,
    mensajeSeguimiento: ''
  }
  bloquearEnvio:boolean = false;
  seguimientoAdopcionDto:SeguimientoAdopcionDto={
    estadoSeguimiento: false,
    fechaSeguimiento: undefined,
    mensajeSeguimiento: ''
  }

  constructor( private router: Router, private adopcionService: AdopcionControllerService, private adoptanteService: AdoptanteControllerService, private seguimientoAdopcionServiceImpl: SeguimientoDeAdoptadosService) { }


  ngOnInit(): void {
    this.getByIdAdoptantes();
    this.historialSeguimiento();
    this.finalizarProceso();
    
  }

   //seguimiento
getByIdAdoptantes(){

  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.adopcionService.etAdopcionPorIdUsingGET(adopcion_id).subscribe(data =>{
  this.adopcionid = data
  this.nombreadoptante = this.adopcionid.adoptante.persona.nombre + " " + this.adopcionid.adoptante.persona.apellidos
  this.correoadoptante = this.adopcionid.adoptante.persona.correo
  this.telefonoadoptante=this.adopcionid.adoptante.persona.telefono
  this.direcionadoptante=this.adopcionid.adoptante.persona.direccion
  //this.fechaadopcion=this.adopcionid.fechaAdopcion

})
  this.Irseguimiento();
}
Irseguimiento() {
  this.router.navigateByUrl("/registrar-seguimiento");
}

enviarMensaje(){
  this.bloquearEnvio = this.activos.length>0
  console.log(this.bloquearEnvio);
  
  if (!this.bloquearEnvio) {
    var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
    this.seguimientoAdopcionDto.fechaSeguimiento = new Date(this.fecha);
    this.seguimientoAdopcionServiceImpl.crearSeguimientoUsingPOST(this.seguimientoAdopcionDto, adopcion_id).subscribe(data =>{
    this.seguimientoAdopcion = data
    console.log(this.seguimientoAdopcion.id);
    location.reload()
  })
  }
  else{
    Swal.fire('Aun existen seguimientos en proceso. Finalicelos para poder iniciar un nuevo seguimiento.')
  }
}

finalizarRespuestaAdoptante(){
  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.seguimientoAdopcionDto.fechaSeguimiento = this.activos[0].fechaSeguimiento;
  this.seguimientoAdopcionDto.mensajeSeguimiento = this.activos[0].mensajeSeguimiento;
  this.seguimientoAdopcionDto.estadoSeguimiento = false;
  this.seguimientoAdopcionServiceImpl.editarSeguimientoUsingPUT(this.seguimientoAdopcionDto, this.activos[0].id).subscribe(data =>{
    location.reload()
 })
}   

historialSeguimiento(){
  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.seguimientoAdopcionServiceImpl.getAllSeguimientosTerminadosUsingGET(adopcion_id).subscribe(data =>{
    this.historial = data.seguimientos
    console.log(this.historial.length)
  })
}

finalizarProceso(){
  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.seguimientoAdopcionServiceImpl.getAllSeguimientosActivosUsingGET(adopcion_id).subscribe(data =>{
    this.activos=data.seguimientos
    console.log(this.activos[0].id);
    
  })
}

regresar(){
  this.router.navigate(['listaAdoptado'])
}

}
