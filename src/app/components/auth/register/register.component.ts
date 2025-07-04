import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../../../models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  userData: RegisterRequest = {
    username: '',
    password: '',
    role: 'Student'
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

 register() {
  this.authService.register(this.userData).subscribe({
    next: (res) => {
      console.log('Registration response:', res);
      this.successMessage = 'Registration successful! Please login.';
      this.errorMessage = '';
    },
    error: (err) => {
      console.error('Registration error:', err);
      this.errorMessage = err.error?.message || 'Registration failed';
      this.successMessage = '';
    }
  });
}

}