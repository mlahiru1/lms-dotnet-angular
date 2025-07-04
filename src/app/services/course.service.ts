import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto, CreateCourseDto, UpdateCourseDto } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:5146/api/course';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(this.baseUrl);
  }

  getCourseById(id: string): Observable<CourseDto> {
    return this.http.get<CourseDto>(`${this.baseUrl}/${id}`);
  }

  createCourse(course: CreateCourseDto): Observable<CourseDto> {
    return this.http.post<CourseDto>(this.baseUrl, course);
  }

  updateCourse(id: string, course: UpdateCourseDto): Observable<CourseDto> {
    return this.http.put<CourseDto>(`${this.baseUrl}/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
