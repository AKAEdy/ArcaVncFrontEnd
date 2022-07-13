import { Component, Input } from '@angular/core';
import { PacienteAlarmInfo } from 'app/alarm/interfaces/paciente-alarm-info';
import { PacienteStatusService } from 'app/service/larms/paciente-status.service';

@Component({
	selector: 'alarm-list-item',
	templateUrl: './alarm-list-item.component.html',
	styleUrls: [ './alarm-list-item.component.css' ]
})
export class AlarmListItemComponent {

	@Input()
	events!: PacienteAlarmInfo;
	@Input()
	status!: any;
	constructor () { }

}
