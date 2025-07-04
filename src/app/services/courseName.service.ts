import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CourseDto,
  CreateCourseDto,
  UpdateCourseDto,
  CourseNameDto,
} from '../models/courseName.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'http://localhost:5146/api/course';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(this.baseUrl);
  }

  getById(id: string): Observable<CourseDto> {
    return this.http.get<CourseDto>(`${this.baseUrl}/${id}`);
  }

  getCourseNameById(courseId: string): Observable<CourseNameDto> {
    return this.http.get<CourseNameDto>(`${this.baseUrl}/${courseId}/name`);
  }

  create(course: CreateCourseDto): Observable<CourseDto> {
    return this.http.post<CourseDto>(this.baseUrl, course);
  }

  update(id: string, course: UpdateCourseDto): Observable<CourseDto> {
    return this.http.put<CourseDto>(`${this.baseUrl}/${id}`, course);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
