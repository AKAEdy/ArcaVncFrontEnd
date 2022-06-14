import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'app/services/data-services.service';
import { Router } from 'express';

@Component({
  selector: 'editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  constructor(private dataService: DataServicesService, private router: Router) { }

  ngOnInit(): void {
  }

}
