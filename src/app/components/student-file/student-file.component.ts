import { Component, OnInit } from '@angular/core';
import { CreateStudentFileDto, StudentFileDto } from '../../models/student-file.model';
import { StudentFileService } from '../../services/student-file.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-file',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './student-file.component.html',
})
export class StudentFileComponent implements OnInit {
  files: StudentFileDto[] = [];
  selectedFile: File | null = null;

  // Simulated logged-in student data (replace this with your auth service)
  student: Student = {
    studentId: '',
    username: '',
    name: '',
    address: '',
    email: '',
    phone: '',
  };

  constructor(private fileService: StudentFileService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.fileService.getAll().subscribe(data => this.files = data);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  upload() {
    if (!this.selectedFile) {
      alert('Please choose a file.');
      return;
    }

    const dto: CreateStudentFileDto = {
      studentId: this.student.studentId,
      file: this.selectedFile
    };

    this.fileService.upload(dto).subscribe(() => {
      this.selectedFile = null;
      this.loadFiles();
    });
  }

  deleteFile(id: number) {
    if (confirm('Are you sure you want to delete this file?')) {
      this.fileService.delete(id).subscribe(() => this.loadFiles());
    }
  }
}
