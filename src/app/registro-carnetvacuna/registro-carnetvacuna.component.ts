import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalesService } from 'app/api/animales.service';

@Component({
  selector: 'registro-carnetvacuna',
  templateUrl: './registro-carnetvacuna.component.html',
  styleUrls: ['./registro-carnetvacuna.component.css']
})
export class RegistroCarnetvacunaComponent implements OnInit {
  idAnimal:number;
  animal:any={};
  constructor(private router: Router) { 
    this.animal={};
 
  }

  ngOnInit(): void {
    this.animal = JSON.parse(localStorage.getItem('animal'));
   
  }

}
