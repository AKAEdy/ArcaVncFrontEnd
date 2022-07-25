import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PacienteStatusService } from 'app/service/larms/paciente-status.service';
import { ListUncheckedEvents } from '../interfaces/list-unchecked-events';
import { EventAlarmDto } from '../interfaces/event-alarm-dto';
import { AlarmService } from 'app/service/alarm.service';

@Component({
	selector: 'alarm-list',
	templateUrl: './alarm-list.component.html',
	styleUrls: [ './alarm-list.component.css' ]
})
export class AlarmListComponent{

	@Input()
	events!: EventAlarmDto[];
	@Input()
	status!: any[];

	constructor ( private _alarmService:AlarmService) { }

	updateEventAlarm(id:number) {
		const checked:Boolean =this.events.find(e => {
			return e.id ===id;
		}).checked;

		if(!checked){
			this._alarmService.update(id);
		}

	}
}
