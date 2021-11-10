import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router, private authService: AuthService) { }

  //Faz o logout do usuário e redireciona para a home
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}