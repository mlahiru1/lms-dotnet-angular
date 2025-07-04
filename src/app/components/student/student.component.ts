import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';
import { CreateStudentDto } from '../../models/create-student.dto';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  editingStudent: Student | null = null;

  newStudent: CreateStudentDto = {
    studentId: '',
    username: '',
    name: '',
    address: '',
    email: '',
    phone: '',
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  addStudent() {
    if (!this.newStudent.name || !this.newStudent.address) return;

    this.studentService.createStudent(this.newStudent).subscribe(() => {
      this.newStudent = { studentId: '', username: '', name: '', address: '', email: '', phone: '' };
      this.loadStudents();
    });
  }

  editStudent(student: Student) {
    this.editingStudent = { ...student };
  }

  updateStudent() {
    if (!this.editingStudent) return;

    this.studentService
      .updateStudent(this.editingStudent.studentId, this.editingStudent)
      .subscribe(() => {
        this.editingStudent = null;
        this.loadStudents();
      });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  isEditing(studentId: string): boolean {
    return this.editingStudent?.studentId === studentId;
  }
}
