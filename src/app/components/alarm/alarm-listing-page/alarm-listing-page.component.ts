import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AlarmService } from "app/service/alarm.service";
import { PacienteStatusService } from "app/service/larms/paciente-status.service";
import { Subject, takeUntil } from "rxjs";
import { EventAlarmDto } from "../interfaces/event-alarm-dto";
import { SpanishPaginatorIntl } from "./spanish-paginator-intl";

@Component({
	selector: "alarm-listing-page",
	templateUrl: "./alarm-listing-page.component.html",
	styleUrls: ["./alarm-listing-page.component.css"],
	providers: [{ provide: MatPaginatorIntl, useValue: SpanishPaginatorIntl() }],
})

export class AlarmListingPageComponent implements OnInit, OnDestroy {
	tabs = ['Todas', 'Sin leer'];

	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	@Input()
	post!: EventAlarmDto;

	constructor(private _alarmService: AlarmService, private _pacienteService: PacienteStatusService) { }


	private unsubscribeSubject: Subject<void> = new Subject<void>();

	dataSource = new MatTableDataSource<EventAlarmDto>();

	events: EventAlarmDto[]=[];

	status!: any[];

	loading: boolean = true;

	emptyContent: Boolean;
	
	pageSizeOptions: number[] = [ 5, 10, 15, 25];

	totalElements = 0;
	currentPage = 0;
	pageSize = 10;


	initPaginator() {
		this.paginator.pageIndex = this.currentPage;
		this.paginator.length = this.totalElements;
	}

	onChangeTab(tab:any){
		(tab ==='Sin leer') ?this.getEventAlarmsPages(this.currentPage,this.pageSize,tab) : this.getEventAlarmsPages(this.currentPage,this.pageSize)
	}
	
	paginate(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.getEventAlarmsPages(this.currentPage,this.pageSize);
	}

	ngOnInit(): void {
		this.getEventAlarmsPages(this.currentPage, this.pageSize)
		this._pacienteService.status$.subscribe((p) => (this.status = p));
	}

	getEventAlarmsPages(page: number, size: number,status?:string) {
		this.loading = true;
		this._alarmService.findAllPageable(page,size,status).pipe(takeUntil(this.unsubscribeSubject)
		).subscribe({
			next: (response) => {
				this.events = response.content.map(AlarmService.getAlarmListing)
				this.emptyContent=response.empty;
				this.totalElements = response.totalElements;
			},
			complete: () => {
				this.loading = false
				console.log("this.emptyContent",this.emptyContent);
				this.emptyContent ? null: this.initPaginator();
			}
		})
	}

	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
	}

}