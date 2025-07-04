import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseDto, UpdateCourseDto } from '../../models/course.model';

@Component({
  selector: 'app-course-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-manager.component.html',
  styleUrls: []
})
export class CourseManagerComponent implements OnInit {
  course: CourseDto | null = null;
  updateData: UpdateCourseDto = { assignment: '' ,courseName: ''};
  error: string = '';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCourse(id);
      } else {
        this.error = 'No course ID provided in route.';
      }
    });
  }

  loadCourse(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe({
      next: (res) => {
        this.course = res;
        this.updateData.assignment = res.assignment || '';
      },
      error: () => this.error = 'Failed to load course.'
    });
  }

  saveAssignment(): void {
    if (!this.course) return;

    if (!this.updateData.assignment.trim()) {
      this.error = 'Assignment cannot be empty.';
      return;
    }

    this.courseService.updateCourse(this.course.courseId, this.updateData).subscribe({
      next: () => {
        this.error = '';
        alert(this.course!.assignment ? 'Assignment updated successfully.' : 'Assignment created successfully.');
        // Update local course object to keep UI in sync
        if (this.course) {
          this.course.assignment = this.updateData.assignment;
        }
      },
      error: () => this.error = 'Failed to save assignment.'
    });
  }
}
