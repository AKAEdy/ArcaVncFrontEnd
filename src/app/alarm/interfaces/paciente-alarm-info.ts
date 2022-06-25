import { Animal } from 'app';
import { TypeEvent } from './type-event';

export interface PacienteAlarmInfo {
	id?: number;
	checked: Boolean;
	body: string;
	eventType: TypeEvent;
	eventDay: Date;
	paciente: Animal;
}
