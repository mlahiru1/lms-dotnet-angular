import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssignmentDto {
  id: number;
  courseId: string;
  assignmentText: string;
  dueDate?: string;
}

export interface CreateAssignmentDto {
  courseId: string;
  assignmentText: string;
  dueDate?: string; 
}

export interface UpdateAssignmentDto {
  assignmentText: string;
  dueDate?: string; 
}

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private baseUrl = 'http://localhost:5146/api/assignment';

  constructor(private http: HttpClient) {}

  getAssignmentsByCourseId(courseId: string): Observable<AssignmentDto[]> {
    return this.http.get<AssignmentDto[]>(`${this.baseUrl}/course/${courseId}`);
  }

  getAssignmentById(id: number): Observable<AssignmentDto> {
    return this.http.get<AssignmentDto>(`${this.baseUrl}/${id}`);
  }

  createAssignment(assignment: CreateAssignmentDto): Observable<AssignmentDto> {
    return this.http.post<AssignmentDto>(this.baseUrl, assignment);
  }

  updateAssignment(id: number, assignment: UpdateAssignmentDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, assignment);
  }

  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
