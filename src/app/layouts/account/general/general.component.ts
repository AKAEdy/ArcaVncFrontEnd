import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'app/api/usuarios.service';
import { AuthService } from 'app/service/auth.service';
import { isEqual } from 'lodash';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ProfileDto } from '../interfaces/profile-dto';
import { AccountService } from '../services/account.service';

export class ErrorMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-general',
	templateUrl: './general.component.html',
	styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

	matcher = new ErrorMatcher();

	profile!: ProfileDto
	profileForm!: FormGroup

	dataEquals: boolean = true;

	constructor(private _userService: UsuariosService, private _authService: AuthService, private _accountService: AccountService, private _fb: FormBuilder, private _router: Router) { }

	ngOnInit() {
		this.initForm()
		this.loadProfile()
		this.checkChanges()
	}

	checkChanges() {
		this.profileForm.valueChanges.subscribe(() => {
			this.dataEquals = isEqual(this.profile, this.profileForm.getRawValue());
		})
	}


	get persona() {
		return this.profileForm.controls['persona'];
	}

	initForm() {
		this.profileForm = this._fb.group({
			id: ['', Validators.required],
			username: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z0-9-_.]+$')]],
			persona: this._fb.group({
				apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*[a-zA-Z ]+')]],
				cedula: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
				celular: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
				correo: ['', [Validators.required, Validators.email]],
				direccion: ['', Validators.required],
				id: ['', Validators.required],
				nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z]*[a-zA-Z]+')]],
				telefono: ['', [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")]]
			})
		})
	}

	updateProfile() {
		if (this.profileForm.valid && this.dataEquals)
			return

		if (this.profileForm.valid && !this.dataEquals) {
			this._accountService.updateProfile(this.profileForm.getRawValue() as ProfileDto, this.profile.id).subscribe({
				next: (response) => {
					this.patchData(this.profileForm.getRawValue())
					this.showToast(response.message, 'success')
					this._authService.setCurrentUser(response.data)
				}
				, error: (e) => {
					this.showToast('Error actualizando perfil', 'error', JSON.stringify(e))
				}, complete: () => {
					this._router.navigateByUrl('/cuenta').then(() => {
						this._router.navigate([this._router.url]);
					});
				}

			})
		}
	}

	resetForm() {
		this.profileForm.markAsPristine()
		if (this.dataEquals)
			return
		console.log('reset');
		this.profileForm.setValue(this.profile)
	}

	patchData(profile: ProfileDto) {
		this.profile = profile ?? {} as ProfileDto
		this.profileForm.setValue(profile)
		this.persona.get('cedula').disable()
	}

	loadProfile() {
		this._userService.myProfileUsingGET().subscribe(data => {
			this.patchData(data)
		})
	}

	reloadCurrentRoute() {
		let currentUrl = this._router.url;
		this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this._router.navigate([currentUrl]);
			console.log(currentUrl);
		});
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
