import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notification, NotificationService } from '../../services/notification.service';
import { AuthService } from '../auth/auth.service'; // Adjust based on your project

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  notifications: Notification[] = [];
  message: string = '';
  error: string = '';
  newMessage: string = '';

  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  get username(): string {
    return this.authService.currentUser?.username ?? '';
  }

  constructor() {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getByUser(this.username).subscribe({
      next: (data) => this.notifications = data,
      error: () => this.error = 'Failed to load notifications.'
    });
  }

  sendNotification(): void {
    if (!this.newMessage.trim()) {
      this.error = 'Message cannot be empty.';
      return;
    }

    this.notificationService.create({ username: this.username, message: this.newMessage }).subscribe({
      next: () => {
        this.newMessage = '';
        this.message = 'Notification sent!';
        this.loadNotifications();
      },
      error: () => this.error = 'Failed to send notification.'
    });
  }

  deleteNotification(id: number): void {
    if (!confirm('Delete this notification?')) return;

    this.notificationService.delete(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.message = 'Notification deleted.';
      },
      error: () => this.error = 'Failed to delete notification.'
    });
  }
}
