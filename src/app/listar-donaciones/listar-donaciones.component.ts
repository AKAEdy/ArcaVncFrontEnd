import { Component, OnInit } from '@angular/core';
import { DonacionesService } from 'app/api/donaciones.service';
import { Donacion } from 'app/model/donacion';
import { data } from 'jquery';

@Component({
  selector: 'listar-donaciones',
  templateUrl: './listar-donaciones.component.html',
  styleUrls: ['./listar-donaciones.component.css']
})
export class ListarDonacionesComponent implements OnInit {
donaciones:Donacion[]=[]
  constructor(private donacionService:DonacionesService) { }

  ngOnInit(): void {
    this.getDonaciones();
  }

  getDonaciones(){
    this.donacionService.getAllDonacionesUsingGET().subscribe(data =>{
      this.donaciones = data
    })
  }

  verCantidad(){
    document.getElementById("cantidad").style.display="block"
    document.getElementById("noVer").style.display="block"
    document.getElementById("ver").style.display="none"
  }

  noVerCantidad(){
    document.getElementById("cantidad").style.display="none"
    document.getElementById("noVer").style.display="none"
    document.getElementById("ver").style.display="block"
  }
}
