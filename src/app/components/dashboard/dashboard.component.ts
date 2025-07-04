import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { StudentLayoutComponent } from '../student-layout/student-layout.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { TeacherLayoutComponent } from '../teacher-layout/teacher-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentLayoutComponent,AdminLayoutComponent, TeacherLayoutComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  user: any; // Change from direct assignment

  constructor(private authService: AuthService) {
    this.user = this.authService.currentUser; // Initialize in constructor
  }

  logout() {
    this.authService.logout();
  }
}