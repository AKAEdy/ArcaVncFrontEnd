import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlarmService } from 'app/service/alarm.service';
import { NotificationService, TypeAlert } from 'app/service/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { ListUncheckedEvents } from '../interfaces/list-unchecked-events';


@Component({
	selector: "bell-notification",
	templateUrl: "./bell-notification.component.html",
	styleUrls: ["./bell-notification.component.css"],
})
export class BellNotificationComponent implements OnInit, OnDestroy {

	todaysDate: string = new Date().toLocaleDateString();

	listuncheckedEvents!: ListUncheckedEvents;

	totalEvents!: number;

	constructor(private _alarmService: AlarmService, private _notificationService: NotificationService) { }

	private unsubscribeSubject: Subject<void> = new Subject<void>();

	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
	}

	ngOnInit(): void {
		this.setNotificationsEvents();
	}

	onCheckEvent(id: any) {
		this._alarmService.update(id);
		this.listuncheckedEvents.events.splice(id, 1);
	}

	setNotificationsEvents() {

		this._alarmService.findAllByUnchechedCurrentEvent().pipe(takeUntil(this.unsubscribeSubject)).subscribe(
				(listuncheckedEvents) => {
					this.listuncheckedEvents = listuncheckedEvents;
					listuncheckedEvents.total > 10 ? (this.totalEvents = 10) : null;
				
				},(e) => {
					console.error("findAllByUnchechedCurrentEvent", e);
				}
			);

		this._alarmService.onPost().pipe(takeUntil(this.unsubscribeSubject)).subscribe((post) => {
			if (post.eventDay.toLocaleDateString("es-EC", { timeZone: "UTC" }) === this.todaysDate) {
				this.listuncheckedEvents.events.push(post);

				++this.listuncheckedEvents.total;
				this.listuncheckedEvents.total > 10 ? (this.totalEvents = 10) : null;
				this._notificationService.showNotification("top", "right", `<span data-notify="message"><span>Paciente:&nbsp;${post.paciente.nombre}</span></span>`, TypeAlert.info)

				console.warn("ES hoy, es hoy !!!");
			}
		});

		this._alarmService.onUpdate().pipe(takeUntil(this.unsubscribeSubject)).subscribe((post) => {
				if (this.listuncheckedEvents.events.length !== 0) {

					this.listuncheckedEvents.events.splice(
						this.listuncheckedEvents.events.findIndex(i => {
							return i.id === post.id
						}),
						1
					);

					--this.listuncheckedEvents.total
					this.listuncheckedEvents.total > 10 ? (this.totalEvents = 10) : null
					this.totalEvents === 0 ?? undefined
				}
			});
	}
}
