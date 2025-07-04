import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from '../../models/login-request.model';
import { RegisterRequest } from '../../models/register-request.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5146/api/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest) {
    return this.http.post<User>(`${this.baseUrl}/login`, credentials).pipe(
      tap(user => {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  register(userData: RegisterRequest) {
    return this.http.post<User>(`${this.baseUrl}/register`, userData);
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  get currentUser() {
    return this.userSubject.value;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}