import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CourseNameDto {
  courseName: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetCourseName {
  private baseUrl = 'http://localhost:5146/api/Course';

  constructor(private http: HttpClient) {}

  getCourseNameById(courseId: string): Observable<CourseNameDto> {
    return this.http.get<CourseNameDto>(`${this.baseUrl}/${courseId}/name`);
  }
}
