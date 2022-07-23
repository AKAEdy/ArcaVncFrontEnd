import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.scss']
})
export class AccountComponent {
  links = [{ path: 'general', icon: 'person', tittle: 'General' }, { path: 'seguridad', icon: 'vpn_key', tittle: ' Contraseña y seguridad' }];
  activeLink = this.links[0].path;
  background: ThemePalette = undefined;
  
  constructor() { }

}
