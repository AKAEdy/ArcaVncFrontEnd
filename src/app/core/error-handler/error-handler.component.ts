import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from 'app/service/error.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'error-handler',
	templateUrl: './error-handler.component.html',
	styleUrls: [ './error-handler.component.css' ]
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {
	message!: any;
	private unsubscribeSubject: Subject<void> = new Subject<void>();

	constructor (private errorService: ErrorService) { }

	ngOnInit(): void {
		this.errorService.onError().pipe(takeUntil(this.unsubscribeSubject)).subscribe(message => this.message = message);
	}

	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
	}

	clear(event: Event) {
		this.message = null;
		event.preventDefault();
	}

}
