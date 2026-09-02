import { Component } from '@angular/core';
import { MenuComponent } from '../../core/layout/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
