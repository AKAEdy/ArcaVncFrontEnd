import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output
} from "@angular/core";
import { AlarmService } from "app/service/alarm.service";
import { PacienteStatusService } from "app/service/larms/paciente-status.service";
import { map, Observable, Observer, Subject, takeUntil } from "rxjs";
import { AlarmPost } from "../interfaces/alarm-post";
import { ListUncheckedEvents } from '../interfaces/list-unchecked-events';
import { PacienteAlarmInfo } from "../interfaces/paciente-alarm-info";
import { TypeEvent } from "../interfaces/type-event";
declare var $: any;
export interface ExampleTab {
	label: string;
	content: string;
}

@Component({
	selector: "alarm-listing-page",
	templateUrl: "./alarm-listing-page.component.html",
	styleUrls: [ "./alarm-listing-page.component.css" ],
})
export class AlarmListingPageComponent implements OnInit, OnDestroy {
	@Output()
	onPost: EventEmitter<AlarmPost> = new EventEmitter<AlarmPost>();
	@Input()
	post!: AlarmPost;
	private unsubscribeSubject: Subject<void> = new Subject<void>();
	todaysDate: string = new Date().toLocaleDateString();
	listuncheckedEvents!: ListUncheckedEvents;
	uncheckedEvents!: PacienteAlarmInfo[];
	avents!: PacienteAlarmInfo[];
	eventsUncheck!: number;
	status!: any[];
	asyncTabs: Observable<ExampleTab[]>;

	constructor (private service: AlarmService, private pacienteStatus: PacienteStatusService) {
		this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
			setTimeout(() => {
				observer.next([
					{ label: 'Todos los eventos', content: 'Content 1' },
					{ label: 'Leidos', content: 'Content 2' },
					{ label: 'Sin leer', content: 'Content 3' },
				]);
			}, 1000);
		});
	}
	ngOnChanges(): void { }
	onSubmit(): void {
		this.service.save({
			...{
				checked: false,
				body: "",
				eventType: TypeEvent.VACUNA,
				eventDay: new Date(),
				pacienteId: 1,
			},
		});
	}
	ngOnInit(): void {
		// this.service
		// 	.findAllByCheckedIsFalse()
		// 	.pipe(
		// 		map((events) => {
		// 			this.eventsUncheck = events.length;
		// 			return events.sort(AlarmListingPageComponent.descendingByEventDay);
		// 		}),
		// 		takeUntil(this.unsubscribeSubject)
		// 	)
		// 	.subscribe((events) => (this.uncheckedEvents = events));

		this.service
			.findAll()
			.pipe(
				map((events) => {
					return events.sort(AlarmListingPageComponent.descendingByEventDay);
				}),
				takeUntil(this.unsubscribeSubject)
			).subscribe((events) => (this.avents = events));

		this.service
			.onPost()
			.pipe(
				map((e) => {
					if (
						e.eventDay.toLocaleDateString("es-EC", { timeZone: "UTC" }) ===
						this.todaysDate
					) {
						this.showNotification(
							"top",
							"right",
							` <span data-notify="message">
							<h5><strong>${ e.body }</strong></h5>
							<span>Paciente:&nbsp;${ e.paciente.nombre }</span>
							</span>
							`,
							TypeAlert.info
						);
						console.log("ES hoy, es hoy !!!");
					}
					return e;
				}),
				takeUntil(this.unsubscribeSubject)
			)
			.subscribe((post) => {
				this.avents.push(post);
				this.avents.sort(AlarmListingPageComponent.descendingByEventDay);
			});
		this.pacienteStatus.status$.subscribe((p) => (this.status = p));
	}

	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
	}

	static descendingByEventDay(
		post1: PacienteAlarmInfo,
		post2: PacienteAlarmInfo
	): any {
		return post2.eventDay.getDate() - post1.eventDay.getDate();
	}

	showNotification(from, align, message?: string, type?: TypeAlert) {
		$.notify(
			{
				icon: "notifications",
				message:
					message ?? "Notificacion <b>Vacia</b> - algo debió salir mal :(.",
			},
			{
				type: type,
				timer: 4000,
				placement: {
					from: from ?? "top",
					align: align ?? "center",
				},
				template:
					'<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
					'<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
					'<i class="material-icons" data-notify="icon">notifications</i> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					"</div>" +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					"</div>",
			}
		);
	}
}

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum TypeAlert {
	"primary" = "primary",
	"info" = "info",
	"success" = "success",
	"warning" = "warning",
	"danger" = "danger",
}

// this.showNotification('top', 'left', `<strong>${ e.body }</strong> - Paciente: ${ e.paciente.nombre }
// 							<img src="${ e.paciente.foto }" alt="${ e.paciente.nombre }" width="75" class="rounded" height="75">`, TypeAlert.info)
// console.log("ES hoy, es hoy !!!")

// events.forEach(e => {
// 	console.log(e.eventDay.toLocaleDateString('es-EC', { timeZone: 'UTC' }), this.todaysDate);
// 	if (e.eventDay.toLocaleDateString('es-EC', { timeZone: 'UTC' }) === this.todaysDate) {
// 		this.showNotification('top', 'left', `<strong>${ e.body }</strong> - Paciente: ${ e.paciente.nombre }
// 		<img src="${ e.paciente.foto }" alt="${ e.paciente.nombre }" width="75" class="rounded" height="75">`, TypeAlert.info)
// 		console.log("ES hoy, es hoy !!!")
// 	}
// });
