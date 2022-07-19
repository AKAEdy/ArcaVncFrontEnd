import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatInputModule} from '@angular/material/input'; 
import { PersonasService } from 'app/api/personas.service';
import { UsuariosService } from 'app/api/usuarios.service';
import { PersonaDtoExtends } from 'app/model/personaDtoExtends';
import { UsuarioDto } from 'app/model/usuarioDto';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.scss']
})
export class PerfilusuarioComponent implements OnInit {

  usuariodto!: UsuarioDto;

  usuariodtoeditar: UsuarioDto [] = [];

  persona:PersonaDtoExtends={
    apellidos: '',
    cedula: '',
    celular: '',
    correo: '',
    direccion: '',
    nombre: '',
    telefono: ''
  }

  constructor(private us: UsuariosService) { }

  ngOnInit(): void {
    this.mostrarperfil()
  }

  mostrarperfil(){
    this.us.myProfileUsingGET().subscribe(data=>{
      this.usuariodto = data as UsuarioDto
      //console.log(data)
    })
  }

  editarperfil(password: string, id: number){
    this.us.passwordCorrectaUsingGET(password,id).subscribe(data=>{
      
    })
  }

  //actualizarperfil(usuariodtoeditar: UsuarioDto, id:number){
    //this.us.updateUsingPUT7([0], id ).subscribe(data=>{

    //})
 // }

}
