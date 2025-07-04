import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrollmentTeacherDto } from '../models/enrollment-teacher-dto.model';
import { CreateTeacherEnrollmentDto } from '../models/create-teacher-enrollment.dto.model';
import { CourseIdDto } from '../models/course-id.dto.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherEnrollmentService {
  private baseUrl = 'http://localhost:5146/api/teacher-enrollments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EnrollmentTeacherDto[]> {
    return this.http.get<EnrollmentTeacherDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<EnrollmentTeacherDto> {
    return this.http.get<EnrollmentTeacherDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateTeacherEnrollmentDto): Observable<EnrollmentTeacherDto> {
    return this.http.post<EnrollmentTeacherDto>(this.baseUrl, dto);
  }

  update(id: number, dto: CreateTeacherEnrollmentDto): Observable<EnrollmentTeacherDto> {
    return this.http.put<EnrollmentTeacherDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCourseIdsByTeacherId(teacherId: string): Observable<CourseIdDto[]> {
      return this.http.get<CourseIdDto[]>(`${this.baseUrl}/teacher/${teacherId}/course-ids`);
    }
}
