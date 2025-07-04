import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-view-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-notification.component.html'
})
export class ViewNotificationsComponent {
  notifications: Notification[] = [];
  error: string = '';

  private notificationService = inject(NotificationService);

  constructor() {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAll().subscribe({
      next: (data) => this.notifications = data,
      error: () => this.error = 'Failed to load notifications.'
    });
  }
}
