import { PacienteAlarmInfo } from './paciente-alarm-info';

export interface ListUncheckedEvents {
	total?: number;
	events: PacienteAlarmInfo[];
}
