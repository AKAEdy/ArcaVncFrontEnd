import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEvent } from 'app/components/alarm/interfaces/type-event';

import { AnimalesRefugioService } from 'app/api/animalesRefugio.service';
import { CarnetsDeVacunacinService } from 'app/api/carnetsDeVacunacin.service';
import { VacunasService } from 'app/api/vacunas.service';

import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse';
import { CarnetVacunacion } from 'app/model/carnetVacunacion';
import { CarnetVacunacionDTO } from 'app/model/carnetVacunacionDTO';
import { Vacuna } from 'app/model/vacuna';
import { VacunaDTO } from 'app/model/vacunaDTO';
import { AlarmService } from 'app/service/alarm.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
	selector: "registro-carnet",
	templateUrl: "./registro-carnet.component.html",
	styleUrls: ["./registro-carnet.component.css"],
})
export class RegistroCarnetComponent implements OnInit {

	animal: AnimalRefugioResponse = {};
	selectedvacunas: VacunaDTO = {};
	vacunas: Vacuna[] = [];
	carnetVacuna: CarnetVacunacionDTO = {};

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private es: AnimalesRefugioService, private carnetVacunacion: CarnetsDeVacunacinService, private vacuna: VacunasService, private _alarmService: AlarmService, private _location: Location
	) { }

	ngOnInit() {
		const id = this.activatedRoute.snapshot.params.id;
		this.es.getAnimalPorIdUsingGET(id).subscribe(
			(data) => {
				this.animal = data.animal;
			}
		);
		this.getAllVacunas();
	}

	guardarCarnet(form: NgForm) {
		if (form.invalid) {
			return
		}
		this.carnetVacuna.animal = this.animal as AnimalRefugioResponse;
		this.carnetVacuna.vacuna = this.selectedvacunas;
		this.carnetVacunacion.createUsingPOST(this.carnetVacuna).subscribe({
			next: (response) => {
				this.carnetVacuna = response.carnetVacunacion;
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Se a registrado correctamente",
					showConfirmButton: false,
					timer: 1500,
				});
			}, error: (e) => {
				this.carnetVacuna = {};
			}, complete: () => {
				this.addEventAlarm(this.carnetVacuna);
				this.irAtras();
			}
		}
		);
	}

	getAllVacunas() {
		this.vacuna.getVacunasUsingGET().subscribe((data) => {
			this.vacunas = data;
		});
	}

	irAtras() {
		// this.router.navigate(["/upgrade", this.animal.id]);

		//Metodo mas efectivo, pero si no igual cambien por el anterior
		this._location.back()
	}

	addEventAlarm(cv: CarnetVacunacion) {
		this._alarmService.save({
			...{
				eventType: TypeEvent.VACUNA,
				eventDay: cv.fechaProximaAplicacion,
				pacienteId: cv.animal.id,
			},
		});
	}
}
