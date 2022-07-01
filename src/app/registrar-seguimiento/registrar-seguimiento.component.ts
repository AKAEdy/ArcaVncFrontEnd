import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdopcionControllerService } from 'app/api/adopcionController.service';
import { AdoptanteControllerService } from 'app/api/adoptanteController.service';
import { SeguimientoDeAdoptadosService } from 'app/api/seguimientoDeAdoptados.service';
import { Adopcion } from 'app/model/adopcion';
import { Adoptante } from 'app/model/adoptante';
import { SeguimientoAdopcionDto } from 'app/model/seguimientoAdopcionDto';
import { data } from 'jquery';
 
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
  fechaadopcion:string;
  seguimientoAdopcion:SeguimientoAdopcionDto={
    estadoSeguimiento: false,
    fechaSeguimiento: undefined,
    mensajeSeguimiento: ''
  };
  mensaje:string;
  historial:SeguimientoAdopcionDto[]=[]

  constructor( private router: Router, private adopcionService: AdopcionControllerService, private adoptanteService: AdoptanteControllerService, private seguimientoAdopcionServiceImpl: SeguimientoDeAdoptadosService) { }


  ngOnInit(): void {
    this.getByIdAdoptantes();
    this.historialSeguimiento();
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
  this.fechaadopcion=this.adopcionid.fechaAdopcion

})
  this.Irseguimiento();
}
Irseguimiento() {
  this.router.navigateByUrl("/registrar-seguimiento");
}

enviarMensaje(){
  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.seguimientoAdopcion.fechaSeguimiento = new Date(this.fechaadopcion);
  this.seguimientoAdopcionServiceImpl.crearSeguimientoUsingPOST(this.seguimientoAdopcion, adopcion_id).subscribe(data =>{
    this.seguimientoAdopcion = data
  })
}

finalizarRespuestaAdoptante(){
  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.seguimientoAdopcion.fechaSeguimiento = new Date(this.fechaadopcion);
  this.seguimientoAdopcionServiceImpl.editarSeguimientoUsingPUT(this.seguimientoAdopcion, adopcion_id).subscribe(data =>{
    location.reload()
 })
}   

historialSeguimiento(){
  var adopcion_id = parseInt (localStorage.getItem("idAdoptado"));
  this.seguimientoAdopcionServiceImpl.getAllSeguimientosTerminadosUsingGET(adopcion_id).subscribe(data =>{
    this.historial = data.seguimientos
  })
}

}
