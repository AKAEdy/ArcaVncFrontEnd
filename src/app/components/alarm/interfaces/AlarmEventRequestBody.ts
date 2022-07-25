import { TypeEvent } from "./type-event";

export interface AlarmEventRequestBody {
	id?: number;
	checked?: Boolean;
	eventType: TypeEvent;
	eventDay: Date;
	pacienteId?: number;
}
