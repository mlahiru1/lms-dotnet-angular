import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id: number;
  username: string;
  message: string;
  createdAt: Date;
}

export interface CreateNotification {
  username: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:5146/api/notifications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  getByUser(username: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/user/${username}`);
  }

  create(notification: CreateNotification): Observable<any> {
    return this.http.post(this.baseUrl, notification);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
