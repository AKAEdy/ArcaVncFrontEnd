import { Injectable } from '@angular/core';
import { TypeEvent } from 'app/components/alarm/interfaces/type-event';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PacienteStatusService {

	constructor () { }
	eventStatus = [
		{
			alertSuccess: '',
			checked: true
		}
		, {
			alertWarning: '',
			checked: false
		}
	]
	private status = new BehaviorSubject<object[]>([
		{
			icon: 'pets',
			name: 'Vacuna',
			eventType: TypeEvent.VACUNA,
			eventStatus: this.eventStatus
		},
		{
			icon: 'pets',
			name: 'Tratamiento',
			eventType: TypeEvent.TRATAMIENTO,
			eventStatus: this.eventStatus
		}

	]);

	status$ = this.status.asObservable();
}
