import { AnimalRefugio } from 'app/model/animalRefugio'
import { AnimalRefugioResponse } from 'app/model/animalRefugioResponse'
import { TypeEvent } from './type-event';

export interface PacienteAlarmInfo {
	id?: number;
	checked: Boolean;
	body: string;
	eventType: TypeEvent;
	eventDay: Date;
	paciente: AnimalRefugioResponse
}
