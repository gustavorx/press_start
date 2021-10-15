import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  mostrarMenu = true;

  esconderMenu() {
    this.mostrarMenu = true;
  }
}
