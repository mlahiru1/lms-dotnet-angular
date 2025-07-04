import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrollmentDto } from '../models/enrollment-dto.model';
import { CreateEnrollmentDto } from '../models/create-enrollment.dto.model';
import { CourseIdDto } from '../models/course-id.dto.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:5146/api/enrollments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EnrollmentDto[]> {
    return this.http.get<EnrollmentDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<EnrollmentDto> {
    return this.http.get<EnrollmentDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateEnrollmentDto): Observable<EnrollmentDto> {
    return this.http.post<EnrollmentDto>(this.baseUrl, dto);
  }

  update(id: number, dto: CreateEnrollmentDto): Observable<EnrollmentDto> {
    return this.http.put<EnrollmentDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

   getCourseIdsByStudentId(studentId: string): Observable<CourseIdDto[]> {
    return this.http.get<CourseIdDto[]>(`${this.baseUrl}/student/${studentId}/course-ids`);
  }
}
