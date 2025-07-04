import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user$() {
    return this.authService.user$;
  }

  logout() {
  this.authService.logout();        // Clear tokens or session
  this.isMenuOpen = false;
  this.router.navigate(['/login']); // Redirect to login page
}
}