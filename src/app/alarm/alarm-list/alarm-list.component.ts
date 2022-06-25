import { Component, Input, OnInit } from '@angular/core';
import { PacienteStatusService } from 'app/service/larms/paciente-status.service';
import { ListUncheckedEvents } from '../interfaces/list-unchecked-events';
import { PacienteAlarmInfo } from '../interfaces/paciente-alarm-info';

@Component({
	selector: 'alarm-list',
	templateUrl: './alarm-list.component.html',
	styleUrls: [ './alarm-list.component.css' ]
})
export class AlarmListComponent {
	@Input()
	events!: PacienteAlarmInfo[];
	@Input()
	uncheckedEvents!: PacienteAlarmInfo[];
	@Input()
	status!: any[];
	constructor () { }
}
