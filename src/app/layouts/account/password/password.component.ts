import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuariosService } from 'app/api/usuarios.service';
import { environment } from 'environments/environment';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export class ErrorMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || isSubmitted));
	}
}
@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
})

export class PasswordComponent implements OnInit {
	matcher = new ErrorMatcher();

	profileForm: FormGroup
	message!:string
	passwordForm: FormGroup

	id: number;

	passPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).([/^\\S+$/]){7,}$"

	constructor(private _userService: UsuariosService, private _fb: FormBuilder) { }

	ngOnInit(): void {
		this.id = JSON.parse(localStorage.getItem(environment.USER_VALUE)).id;
		this.buildFormPassword()
	}


	get passwords() {
		return this.passwordForm.controls['passwords'];
	}

	buildFormPassword() {
		this.passwordForm = this._fb.group({
			current_password: ['', [Validators.required,Validators.minLength(1)]],
			new_password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
		});
	}

	resetForm() {
		this.passwordForm.markAsUntouched()
		this.passwordForm.markAsPristine()
		this.passwordForm.reset()
	}

	updatePasswor() {
		if (!this.passwordForm.valid) { return }

		this._userService.passwordCorrectaUsingGET(this.passwordForm.get('current_password').value, this.id).subscribe(match => {

			if (!match) {
				// this.showToast("La contraseña actual no es la correcta", "error")
				this.message='La contraseña actual que ha introducido no es la correcta';
				this.passwordForm.get('current_password').reset();
				// this.resetForm()
				return
			}
			
			this._userService.patchPasswordUsingPATCH(this.id, this.passwordForm.get('new_password').value).subscribe(message => {
				this.showToast(message.message, "success")
				this.resetForm()
				}
			)
		})

	}
	showToast(errorMessage: string, icon: SweetAlertIcon, description?: string) {
		Swal.fire({
			timer: 4000,
			title: errorMessage,
			text: description,
			toast: true,
			icon: icon,
			position: 'top-end',
			showConfirmButton: false,
			showClass: {
				popup: 'animate__animated animate__bounceInRight'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutRight'
			}
		});
	}
}



// checkPassword(firstControlName: string, secondControlName: string): ValidatorFn {
	// 	return (control: AbstractControl): {[key: string]: any} => {
	// 		const firstControl= control.get(firstControlName);
	// 		const secondControl= control.get(secondControlName);
	// 		if (!firstControl|| !secondControl) return null;
	// 		return firstControl.value == secondControl.value ? null : {matchingFields: true}
	// 	}
	// }
			// passwords: this._fb.group({
			// 	confirm_password: ['', [Validators.required,Validators.pattern(this.passPattern)]],
			// },
			// 	{ validator: this.checkPassword("new_password", "confirm_password")
			//  }
			// ),
