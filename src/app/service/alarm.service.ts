import { Injectable } from '@angular/core';
import { PacienteAlarmInfo } from 'app/alarm/interfaces/paciente-alarm-info';
import { AlarmPost } from 'app/alarm/interfaces/alarm-post';
import { first, map, Observable } from 'rxjs';
import { SocketClientService } from '../core/socket-client.service';
import { ListaAdoptadoComponent } from 'app/lista-adoptado/lista-adoptado.component';
import { ListUncheckedEvents } from 'app/alarm/interfaces/list-unchecked-events';
@Injectable({
	providedIn: 'root'
})

export class AlarmService {

	constructor (private socketClient: SocketClientService) { }

	findAll(): Observable<PacienteAlarmInfo[]> {
		return this.socketClient
			.onMessage('/topic/paciente/alarms/get')
			.pipe(first(), map(alarms => alarms.map(AlarmService.getAlarmListing)));
	}
	findAllByCheckedIsFalse(): Observable<PacienteAlarmInfo[]> {
		return this.socketClient
			.onMessage('/topic/paciente/alarms/getUncheck')
			.pipe(first(), map(alarms => alarms.map(AlarmService.getAlarmListing)));
	}
	findAllByUnchechedEvent(): Observable<ListUncheckedEvents> {
		return this.socketClient
			.onMessage('/topic/paciente/alarms/eventsUncheck')
			.pipe(first(), map(alarms => alarms.map(AlarmService.getAlarmListing)));
	}
	findAllByUnchechedCurrentEvent(): Observable<ListUncheckedEvents> {
		return this.socketClient.onMessage('/topic/paciente/alarms/currentEvent').pipe(first());
	}

	findId(id: number): Observable<PacienteAlarmInfo> {
		return this.socketClient
			.onMessage(`/topic/paciente/alarms/${ id }/get`)
			.pipe(first(), map(alarm => AlarmService.getPacienteAlarmInfo(alarm)));
	}

	findByPaciente(id: number): Observable<PacienteAlarmInfo[]> {
		return this.socketClient
			.onMessage(`/topic/paciente/alarm/${ id }/alarms/get`)
			.pipe(first(), map(alarms => alarms.map(AlarmService.getAlarmListing)));
	}

	save(alarm: AlarmPost) {
		return this.socketClient.send('/topic/paciente/alarms/create', alarm);
	}
	update(id: number) {
		return this.socketClient.send('/topic/paciente/alarms/checkEvent', id);
	}

	onPost(): Observable<PacienteAlarmInfo> {
		return this.socketClient.onMessage('/topic/paciente/alarms/created').pipe(map(alarm => AlarmService.getAlarmListing(alarm)));
	}
	onUpdate(): Observable<PacienteAlarmInfo> {
		return this.socketClient.onMessage('/topic/paciente/alarms/checked').pipe(map(alarm => AlarmService.getAlarmListing(alarm)));
	}

	static getAlarmListing(alarm: any): PacienteAlarmInfo {
		const eventDay = new Date(alarm[ 'eventDay' ]);
		return { ...alarm, eventDay };
	}

	static getPacienteAlarmInfo(alarm: any): PacienteAlarmInfo {
		const eventDay = new Date(alarm[ 'eventDay' ]);
		// const comments = alarm[ 'comments' ].map((comment: any) => AlarmService.getComment(comment));
		return { ...alarm, eventDay };
	}
}
