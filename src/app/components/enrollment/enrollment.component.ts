import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentDto } from '../../models/enrollment-dto.model';
import { CreateEnrollmentDto } from '../../models/create-enrollment.dto.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
})
export class EnrollmentComponent implements OnInit {
  enrollments: EnrollmentDto[] = [];
  groupedEnrollments: { [studentId: string]: EnrollmentDto[] } = {};
  newEnrollment: CreateEnrollmentDto = { courseId: '', studentId: '' };
  editId: number | null = null;
  editEnrollment: CreateEnrollmentDto = { courseId: '', studentId: '' };
  expandedGroups: { [studentId: string]: boolean } = {};

  constructor(private enrollmentService: EnrollmentService) {}

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
      const { studentId } = enrollment;
      if (!acc[studentId]) acc[studentId] = [];
      acc[studentId].push(enrollment);
      return acc;
    }, {} as { [studentId: string]: EnrollmentDto[] });

    for (const key of Object.keys(this.groupedEnrollments)) {
      if (!(key in this.expandedGroups)) {
        this.expandedGroups[key] = false;
      }
    }
  }

  toggleGroup(studentId: string) {
    this.expandedGroups[studentId] = !this.expandedGroups[studentId];
  }

  createEnrollment() {
    this.enrollmentService.create(this.newEnrollment).subscribe(() => {
      this.newEnrollment = { courseId: '', studentId: '' };
      this.loadEnrollments();
    });
  }

  setEdit(enrollment: EnrollmentDto) {
    this.editId = enrollment.id;
    this.editEnrollment = {
      courseId: enrollment.courseId,
      studentId: enrollment.studentId
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
