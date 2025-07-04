import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Teacher } from '../../models/teacher.model';
import { CreateTeacherDto } from '../../models/create-teacher.dto';
import { TeacherService } from '../../services/teacher.service ';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher.component.html',
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  editingTeacher: Teacher | null = null;

  newTeacher: CreateTeacherDto = {
    teacherId: '',
    username: '',
    name: '',
    subject: '',
    email: '',
    phone: '',
  };

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  addTeacher() {
    if (!this.newTeacher.name || !this.newTeacher.subject) return;

    this.teacherService.createTeacher(this.newTeacher).subscribe(() => {
      this.newTeacher = { teacherId: '', username: '', name: '', subject: '', email: '', phone: '' };
      this.loadTeachers();
    });
  }

  editTeacher(teacher: Teacher) {
    this.editingTeacher = { ...teacher };
  }

  updateTeacher() {
    if (!this.editingTeacher) return;

    this.teacherService
      .updateTeacher(this.editingTeacher.teacherId, this.editingTeacher)
      .subscribe(() => {
        this.editingTeacher = null;
        this.loadTeachers();
      });
  }

  deleteTeacher(id: string) {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      this.loadTeachers();
    });
  }

  isEditing(teacherId: string): boolean {
    return this.editingTeacher?.teacherId === teacherId;
  }
}
