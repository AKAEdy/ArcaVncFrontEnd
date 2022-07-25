import { EventAlarmDto } from './event-alarm-dto';

export interface ListUncheckedEvents {
	total?: number;
	events: EventAlarmDto[];
}
