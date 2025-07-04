import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadedFileDto, UploadedFileService } from '../../services/uploaded-file.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-uploaded-files',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uploaded-files.component.html'
})
export class UploadedFilesComponent {
  uploadedFiles: UploadedFileDto[] = [];
  selectedFile: File | null = null;
  error = '';
  message = '';

  private fileService = inject(UploadedFileService);
  private authService = inject(AuthService);

  get username(): string {
    return this.authService.currentUser?.username ?? '';
  }

  constructor() {
    this.loadFiles();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    if (!this.username || !this.selectedFile) {
      this.error = 'Username and file are required.';
      return;
    }

    this.fileService.uploadFile(this.username, this.selectedFile).subscribe({
      next: () => {
        this.message = 'File uploaded successfully!';
        this.error = '';
        this.selectedFile = null;
        this.loadFiles();
      },
      error: () => {
        this.error = 'Upload failed.';
      }
    });
  }

  loadFiles(): void {
    this.fileService.getAll().subscribe({
      next: (data) => this.uploadedFiles = data,
      error: () => this.error = 'Failed to load files.'
    });
  }

  deleteFile(id: number): void {
    if (!confirm('Are you sure you want to delete this file?')) return;

    this.fileService.delete(id).subscribe({
      next: () => {
        this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== id);
        this.message = 'File deleted.';
      },
      error: () => this.error = 'Delete failed.'
    });
  }
}
