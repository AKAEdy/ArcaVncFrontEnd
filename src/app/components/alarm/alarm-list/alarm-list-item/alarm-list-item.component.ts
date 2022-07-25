import { Component, Input, OnDestroy, ElementRef, Directive, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { EventAlarmDto } from 'app/components/alarm/interfaces/event-alarm-dto';

@Component({
	selector: 'alarm-list-item',
	templateUrl: './alarm-list-item.component.html',
	styleUrls: [ './alarm-list-item.component.css' ]
})
export class AlarmListItemComponent{
	@Input()
	events!: EventAlarmDto;
	
	@Input()
	status!: any;

	@Output() eventAlarm = new EventEmitter<number>();

	constructor () { }

	updateEventAlarm(id:number){
		this.eventAlarm.emit(id);
	}

}
