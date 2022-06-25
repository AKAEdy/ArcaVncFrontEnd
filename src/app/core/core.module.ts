
import { DateReadableComponent } from "./date-readable/date-readable.component";
import { ErrorHandlerComponent } from "./error-handler/error-handler.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

@NgModule({
	declarations: [
		DateReadableComponent,
		ErrorHandlerComponent,
	],
	imports: [ CommonModule, RouterModule ],
	exports: [
		DateReadableComponent,
		ErrorHandlerComponent,
	],
})
export class CoreModule { }
