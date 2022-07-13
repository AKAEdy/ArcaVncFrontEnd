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
	],
	exports: [AlarmListComponent, BellNotificationComponent],
})
export class AlarmModule {}
