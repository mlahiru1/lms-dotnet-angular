import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentDto } from '../../models/enrollment-dto.model';
import { CreateTeacherEnrollmentDto } from '../../models/create-teacher-enrollment.dto.model';
import { TeacherEnrollmentService } from '../../services/teacher-enrollment.service';
import { EnrollmentTeacherDto } from '../../models/enrollment-teacher-dto.model';

@Component({
  selector: 'app-teacher-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-enrollment.component.html',
})
export class TeacherEnrollmentComponent implements OnInit {
  enrollments: EnrollmentTeacherDto[] = [];
  groupedEnrollments: { [teacherId: string]: EnrollmentTeacherDto[] } = {};
  newEnrollment: CreateTeacherEnrollmentDto = { courseId: '', teacherId: '' };
  editId: number | null = null;
  editEnrollment: CreateTeacherEnrollmentDto = { courseId: '', teacherId: '' };
  expandedGroups: { [teacherId: string]: boolean } = {};

  constructor(private enrollmentService: TeacherEnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getAll().subscribe(data => {
      this.enrollments = data;
      this.groupEnrollmentsByStudent();
    });
  }

  groupEnrollmentsByStudent() {
    this.groupedEnrollments = this.enrollments.reduce((acc, enrollment) => {
      const { teacherId } = enrollment;
      if (!acc[teacherId]) acc[teacherId] = [];
      acc[teacherId].push(enrollment);
      return acc;
    }, {} as { [teacherId: string]: EnrollmentTeacherDto[] });

    for (const key of Object.keys(this.groupedEnrollments)) {
      if (!(key in this.expandedGroups)) {
        this.expandedGroups[key] = false;
      }
    }
  }

  toggleGroup(teacherId: string) {
    this.expandedGroups[teacherId] = !this.expandedGroups[teacherId];
  }

  createEnrollment() {
    this.enrollmentService.create(this.newEnrollment).subscribe(() => {
      this.newEnrollment = { courseId: '', teacherId: '' };
      this.loadEnrollments();
    });
  }

  setEdit(enrollment: EnrollmentTeacherDto) {
    this.editId = enrollment.id;
    this.editEnrollment = {
      courseId: enrollment.courseId,
      teacherId: enrollment.teacherId
    };
  }

  updateEnrollment() {
    if (this.editId !== null) {
      this.enrollmentService.update(this.editId, this.editEnrollment).subscribe(() => {
        this.editId = null;
        this.loadEnrollments();
      });
    }
  }

  deleteEnrollment(id: number) {
    this.enrollmentService.delete(id).subscribe(() => {
      this.loadEnrollments();
    });
  }
}
