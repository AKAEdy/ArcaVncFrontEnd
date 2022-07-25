import { AlarmListItemComponent } from "./alarm-list/alarm-list-item/alarm-list-item.component";
import { AlarmListingPageComponent } from "./alarm-listing-page/alarm-listing-page.component";
import { AlarmListComponent } from "./alarm-list/alarm-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "app/core/core.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { BellNotificationComponent } from "./bell-notification/bell-notification.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { SpanishPaginatorIntl } from "./alarm-listing-page/spanish-paginator-intl";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
@NgModule({
	declarations: [
		AlarmListingPageComponent,
		AlarmListItemComponent,
		AlarmListComponent,
		BellNotificationComponent,
	],
	imports: [
		ReactiveFormsModule,
		RouterModule,
		CommonModule,
		FormsModule,
		CoreModule,
		MatTabsModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,MatPaginatorModule,MatInputModule,MatSelectModule
	],
	exports: [AlarmListComponent, BellNotificationComponent],providers: [
		{ provide: MatPaginatorIntl, useValue: SpanishPaginatorIntl() }
	  ]
})
export class AlarmModule {}
