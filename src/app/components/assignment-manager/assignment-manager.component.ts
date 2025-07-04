import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AssignmentDto,
  AssignmentService,
  CreateAssignmentDto,
  UpdateAssignmentDto
} from '../../services/assignment.service';

@Component({
  selector: 'app-assignment-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment-manager.component.html',
  styleUrls: []
})
export class AssignmentManagerComponent implements OnInit {
  courseId!: string;

  assignments: AssignmentDto[] = [];
  newAssignmentText = '';
  newAssignmentDueDate = '';       // <-- Added
  editingAssignmentId: number | null = null;
  editingAssignmentText = '';
  editingAssignmentDueDate = '';   // <-- Added
  error = '';

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('courseId');
      if (id) {
        this.courseId = id;
        this.loadAssignments();
      } else {
        this.error = 'No course ID provided in URL.';
      }
    });
  }

  loadAssignments(): void {
    if (!this.courseId) {
      this.error = 'No course ID provided.';
      return;
    }
    this.assignmentService.getAssignmentsByCourseId(this.courseId).subscribe({
      next: (assignments) => {
        this.assignments = assignments;
        this.error = '';
      },
      error: () => this.error = 'Failed to load assignments.'
    });
  }

  createAssignment(): void {
    if (!this.newAssignmentText.trim()) {
      alert('Assignment text cannot be empty');
      return;
    }

    const newAssignment: CreateAssignmentDto = {
      courseId: this.courseId,
      assignmentText: this.newAssignmentText.trim(),
      dueDate: this.newAssignmentDueDate || undefined,
    };

    this.assignmentService.createAssignment(newAssignment).subscribe({
      next: (created) => {
        this.assignments.push(created);
        this.newAssignmentText = '';
        this.newAssignmentDueDate = '';   // reset date
        this.error = '';
      },
      error: () => this.error = 'Failed to create assignment.'
    });
  }

  startEditing(assignment: AssignmentDto): void {
    this.editingAssignmentId = assignment.id;
    this.editingAssignmentText = assignment.assignmentText;
    this.editingAssignmentDueDate = assignment.dueDate ? assignment.dueDate.substring(0, 10) : ''; // format for input[type=date]
  }

  cancelEditing(): void {
    this.editingAssignmentId = null;
    this.editingAssignmentText = '';
    this.editingAssignmentDueDate = '';
  }

  updateAssignment(): void {
    if (!this.editingAssignmentText.trim() || this.editingAssignmentId === null) return;

    const updateDto: UpdateAssignmentDto = {
      assignmentText: this.editingAssignmentText.trim(),
      dueDate: this.editingAssignmentDueDate || undefined,
    };

    this.assignmentService.updateAssignment(this.editingAssignmentId, updateDto).subscribe({
      next: () => {
        const assignment = this.assignments.find(a => a.id === this.editingAssignmentId);
        if (assignment) {
          assignment.assignmentText = this.editingAssignmentText.trim();
          assignment.dueDate = this.editingAssignmentDueDate ;
        }
        this.cancelEditing();
        this.error = '';
      },
      error: () => this.error = 'Failed to update assignment.'
    });
  }

  deleteAssignment(id: number): void {
    if (!confirm('Are you sure you want to delete this assignment?')) return;

    this.assignmentService.deleteAssignment(id).subscribe({
      next: () => {
        this.assignments = this.assignments.filter(a => a.id !== id);
        this.error = '';
      },
      error: () => this.error = 'Failed to delete assignment.'
    });
  }
}
