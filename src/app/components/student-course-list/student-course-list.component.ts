import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetIdService } from '../../services/get-id.service';
import { AuthService } from '../auth/auth.service';
import { GetCourseName } from '../../services/get-courseName.service';
import { RouterModule } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';

interface CourseDisplay {
  courseId: string;
  courseName: string;
}

@Component({
  selector: 'app-student-course-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './student-course-list.component.html',
  styleUrls: []
})
export class StudentCourseList implements OnInit {
  courseCards: CourseDisplay[] = [];
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private getIdService: GetIdService,
    private courseService: GetCourseName
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user?.username) {
      this.getIdService.getStudentIdByUsername(user.username).subscribe({
        next: (res) => this.fetchCourseIds(res.id),
        error: () => {
          this.loading = false;
          this.errorMessage = 'Failed to retrieve student ID.';
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = 'User not logged in.';
    }
  }

  private fetchCourseIds(studentId: string): void {
  this.enrollmentService.getCourseIdsByStudentId(studentId).subscribe({
    next: (courseIds) => {
      if (courseIds.length === 0) {
        this.errorMessage = 'No courses found.';
        this.loading = false;
        return;
      }

      const requests = courseIds.map(c =>
        this.courseService.getCourseNameById(c.courseId).toPromise().then(nameRes => ({
          courseId: c.courseId,
          courseName: nameRes?.courseName ?? 'Unknown Course'
        }))
      );

      Promise.all(requests).then(results => {
        this.courseCards = results;
        this.loading = false;
      }).catch(err => {
        console.error(err);
        this.errorMessage = 'Failed to fetch course names.';
        this.loading = false;
      });
    },
    error: () => {
      this.errorMessage = 'Failed to load course IDs.';
      this.loading = false;
    }
  });
}

}
