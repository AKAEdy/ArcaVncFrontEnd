import { Component, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'date-readable',
	templateUrl: './date-readable.component.html'
})
export class DateReadableComponent implements OnChanges {
	@Input()
	date!: Date;
	dateString!: string;

	constructor () {
	}

	ngOnChanges(): void {
		const options = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' } as const;
		this.dateString = this.date.toLocaleDateString('es-EC', options);
	}


}
