import {TypeEvent} from "./type-event";
import {Animal} from "../../model/animal";

export interface AlarmPost {
	id?: number;
	checked: Boolean;
	body: string;
	eventType: TypeEvent;
	eventDay: Date;
	pacienteId?: number;
}
