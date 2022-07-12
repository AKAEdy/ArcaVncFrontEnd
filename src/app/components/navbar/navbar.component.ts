import { Location } from '@angular/common'
import { Component, ElementRef, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'app/service/auth.service'
import { SidebarService } from 'app/service/sidebar/sidebar.service'
import { filter } from 'rxjs'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
	usernameSesion: string
	isLogged = false;
	private listTitles: any[]
	location: Location
	mobile_menu_visible: any = 0;
	private toggleButton: any
	private sidebarVisible: boolean

	constructor (location: Location, private sidebar: SidebarService, private element: ElementRef, private router: Router, private authService: AuthService) {
		this.location = location
		this.sidebarVisible = false
	}

	ngOnInit() {
		this.usernameSesion = localStorage.getItem("usernameSesion")
		this.sidebar._menuItems$.subscribe((menuItems) => {
			this.listTitles = menuItems
		})
		// this.listTitles = ROUTES.filter(listTitle => listTitle);
		// console.log(this.listTitles);
		const navbar: HTMLElement = this.element.nativeElement
		this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[ 0 ]
		this.router.events.subscribe((event) => {
			this.sidebarClose()
			var $layer: any = document.getElementsByClassName('close-layer')[ 0 ]
			if ($layer) {
				$layer.remove()
				this.mobile_menu_visible = 0
			}
		})
		this.OnInit()
	}

	OnInit() {
	}

	onLogOut(): void {
		this.authService.logout()
	}

	sidebarOpen() {
		const toggleButton = this.toggleButton
		const body = document.getElementsByTagName('body')[ 0 ]
		setTimeout(function () {
			toggleButton.classList.add('toggled')
		}, 500)

		body.classList.add('nav-open')

		this.sidebarVisible = true
	};
	sidebarClose() {
		const body = document.getElementsByTagName('body')[ 0 ]
		this.toggleButton.classList.remove('toggled')
		this.sidebarVisible = false
		body.classList.remove('nav-open')
	};
	sidebarToggle() {
		// const toggleButton = this.toggleButton;
		// const body = document.getElementsByTagName('body')[0];
		var $toggle = document.getElementsByClassName('navbar-toggler')[ 0 ]

		if (this.sidebarVisible === false) {
			this.sidebarOpen()
		} else {
			this.sidebarClose()
		}
		const body = document.getElementsByTagName('body')[ 0 ]

		if (this.mobile_menu_visible == 1) {
			// $('html').removeClass('nav-open');
			body.classList.remove('nav-open')
			if ($layer) {
				$layer.remove()
			}
			setTimeout(function () {
				$toggle.classList.remove('toggled')
			}, 400)

			this.mobile_menu_visible = 0
		} else {
			setTimeout(function () {
				$toggle.classList.add('toggled')
			}, 430)

			var $layer = document.createElement('div')
			$layer.setAttribute('class', 'close-layer')


			if (body.querySelectorAll('.main-panel')) {
				document.getElementsByClassName('main-panel')[ 0 ].appendChild($layer)
			} else if (body.classList.contains('off-canvas-sidebar')) {
				document.getElementsByClassName('wrapper-full-page')[ 0 ].appendChild($layer)
			}

			setTimeout(function () {
				$layer.classList.add('visible')
			}, 100)

			$layer.onclick = function () { //asign a function
				body.classList.remove('nav-open')
				this.mobile_menu_visible = 0
				$layer.classList.remove('visible')
				setTimeout(function () {
					$layer.remove()
					$toggle.classList.remove('toggled')
				}, 400)
			}.bind(this)

			body.classList.add('nav-open')
			this.mobile_menu_visible = 1

		}
	};

	getTitle() {
		var titlee = this.location.prepareExternalUrl(this.location.path())
		// if (titlee.charAt(0) === '#') {
		// 	titlee = titlee.slice(1);
		// }

		// Crea una lista nueva con todas las url y titulos correspondientes, ya sea menu general o submenus(items)
		let tittles = this.listTitles.reduce((items, menu) => items.concat((menu.items ?? menu)), [])

		// Si hay algun objeto vacio proveniente del menu, lo elimina para no causar un error con undeffined al tratar de extraer la url
		let menu = tittles.filter(items => { return Object.keys(items).length !== 0 }).find(menu => menu[ 'url' ] === titlee.split('#/')[ 1 ]
		)

		return menu?.tittle ?? 'Dashboard'

		// for (var item = 0; item < this.listTitles.length; item++) {
		// 	if (this.listTitles[ item ].path === titlee) {
		// 		return this.listTitles[ item ].title;
		// 	}
		// }
		// return 'Dashboard';
	}
}
