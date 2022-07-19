import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginUsuario } from "app/models/login-usuario";
import { AuthService } from "app/service/auth.service";
import Swal from "sweetalert2";

@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

	loginUsuario: LoginUsuario;
	errorMessage!: string;
	loginForm!: FormGroup;

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
		this.loginForm = new FormGroup({
			username: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required])
		})
	}

	onLogin(): void {
		this.loginUsuario = this.loginForm.value;
		this.authService.login(this.loginUsuario).subscribe(
			(data) => {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 1500,
				});
				Toast.fire({
					icon: "success",
					title: `Bienvenido ${data.username}`,
				});
			},
			(err) => {
				this.errorMessage = "";
				if (err.error.code === 401) {
					this.errorMessage = err.error.message;
				}

				if (err.error.code === 400) {
					if (err.error.errors.length === 1 && !err.error.errors.includes('registrado')) {
						this.errorMessage = err.error.errors[0].split(" ").slice(3).join(" ");
					}

					if (err.error.errors.includes('Usuario no registrado')) {
						this.errorMessage = err.error.errors;
					}

					if (err.error.errors.length === 2) {
						this.errorMessage = 'Ingrese las credenciales'
					}
				}
			}
		);
	}
}
