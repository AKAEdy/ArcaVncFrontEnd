import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AlarmService } from 'app/service/alarm.service';
import { Subject, takeUntil } from 'rxjs';
import { AlarmPost } from '../interfaces/alarm-post';
import { ListUncheckedEvents } from '../interfaces/list-unchecked-events';

@Component({
	selector: "bell-notification",
	templateUrl: "./bell-notification.component.html",
	styleUrls: ["./bell-notification.component.css"],
})
export class BellNotificationComponent implements OnInit, OnDestroy {
	constructor(private service: AlarmService) {}
	
	@Output()
	onPost: EventEmitter<AlarmPost> = new EventEmitter<AlarmPost>();
	
	todaysDate: string = new Date().toLocaleDateString();
	
	listuncheckedEvents!: ListUncheckedEvents;
	
	totalElements!: number;

	
	private unsubscribeSubject: Subject<void> = new Subject<void>();
	
	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
	}

	ngOnInit(): void {
		this.setNotificationsEvents();
	}
	onclick(id: any) {
		console.log("checked", id);
		this.service.update(id);
		this.listuncheckedEvents.events.splice(id, 1);
	}
	setNotificationsEvents() {
		this.service
			.findAllByUnchechedCurrentEvent()
			.pipe(takeUntil(this.unsubscribeSubject))
			.subscribe(
				(listuncheckedEvents) => {
					this.listuncheckedEvents = listuncheckedEvents;
					listuncheckedEvents.total > 10 ? (this.totalElements = 10) : null;
				},
				(e) => {
					console.log("setNotificationsEvents", e);
				}
			);

		this.service
			.onPost()
			.pipe(takeUntil(this.unsubscribeSubject))
			.subscribe((post) => {
				if (
					post.eventDay.toLocaleDateString("es-EC", { timeZone: "UTC" }) ===
					this.todaysDate
				) {
					this.listuncheckedEvents.events.push(post);
					++this.listuncheckedEvents.total;
					this.listuncheckedEvents.total > 10
						? (this.totalElements = 10)
						: null;
					console.log("ES hoy, es hoy !!!");
				}
			});
		this.service
			.onUpdate()
			.pipe(takeUntil(this.unsubscribeSubject))
			.subscribe((post) => {
				this.listuncheckedEvents.events.splice(
					this.listuncheckedEvents.events.findIndex((object) => {
						return object.id === post.id;
					}),
					1
				);
				--this.listuncheckedEvents.total;
				this.listuncheckedEvents.total > 10 ? (this.totalElements = 10) : null;
				this.totalElements === 0 ?? undefined;
			});
	}
}
