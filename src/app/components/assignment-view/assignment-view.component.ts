import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService, AssignmentDto } from '../../services/assignment.service';

@Component({
  selector: 'app-assignment-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-view.component.html',
  styleUrls: []
})
export class AssignmentViewerComponent implements OnInit {
  assignments: AssignmentDto[] = [];
  error = '';

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      if (courseId) {
        this.loadAssignments(courseId);
      } else {
        this.error = 'No course ID provided in URL.';
      }
    });
  }

  loadAssignments(courseId: string): void {
    this.assignmentService.getAssignmentsByCourseId(courseId).subscribe({
      next: (res) => {
        this.assignments = res;
        this.error = '';
      },
      error: () => {
        this.error = 'Failed to load assignments.';
      }
    });
  }
}
