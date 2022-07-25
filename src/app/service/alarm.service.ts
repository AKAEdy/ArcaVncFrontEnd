import { Injectable } from '@angular/core';
import { AlarmEventRequestBody } from 'app/components/alarm/interfaces/AlarmEventRequestBody';
import { ListUncheckedEvents } from 'app/components/alarm/interfaces/list-unchecked-events';
import { EventAlarmDto } from 'app/components/alarm/interfaces/event-alarm-dto';
import { first, map, Observable } from 'rxjs';
import { SocketClientService } from '../core/socket-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
	providedIn: 'root'
})

export class AlarmService {

	constructor(private socketClient: SocketClientService,private _http:HttpClient) { }
    
	findAllPageable(page:number,size:number,status?:string):Observable<any>{
		return this._http.get<any>(`${environment.BASE_URL}events/alarms/pages`,{params:{page:page,size:size,status:status || ''}}).pipe(first())
	}

	findAll(): Observable<EventAlarmDto[]> {
		return this.socketClient
			.onMessage('/topic/paciente/alarms/get')
			.pipe(first(), map(alarms => alarms.content.map(AlarmService.getAlarmListing)));
	}

	findAllByCheckedIsFalse(): Observable<EventAlarmDto[]> {
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

	findId(id: number): Observable<EventAlarmDto> {
		return this.socketClient
			.onMessage(`/topic/paciente/alarms/${id}/get`)
			.pipe(first(), map(alarm => AlarmService.getPacienteAlarmInfo(alarm)));
	}

	findByPaciente(id: number): Observable<EventAlarmDto[]> {
		return this.socketClient
			.onMessage(`/topic/paciente/alarm/${id}/alarms/get`)
			.pipe(first(), map(alarms => alarms.map(AlarmService.getAlarmListing)));
	}

	save(alarm: AlarmEventRequestBody) {
		return this.socketClient.send('/topic/paciente/alarms/create', alarm);
	}

	retrieveByPage() {
		return this.socketClient.send('/topic/paciente/alarms/pageable',{});
	}

	update(id: number) {
		return this.socketClient.send('/topic/paciente/alarms/checkEvent', id);
	}

	onPost(): Observable<EventAlarmDto> {
		return this.socketClient.onMessage('/topic/paciente/alarms/created').pipe(map(alarm => AlarmService.getAlarmListing(alarm)));
	}

	onChangedPage(): Observable<any> {
		return this.socketClient.onMessage('/topic/paciente/alarms/getPageable');
	}

	onUpdate(): Observable<EventAlarmDto> {
		return this.socketClient.onMessage('/topic/paciente/alarms/checked').pipe(map(alarm => AlarmService.getAlarmListing(alarm)));
	}

	static getAlarmListing(alarm: EventAlarmDto): EventAlarmDto {	
		const eventDay = new Date(alarm['eventDay']);
		return { ...alarm, eventDay };
	}


	static getPacienteAlarmInfo(alarm: any): EventAlarmDto {
		const eventDay = new Date(alarm['eventDay']);
		return { ...alarm, eventDay };
	}
}
