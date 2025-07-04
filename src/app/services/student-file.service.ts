import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentFileDto , CreateStudentFileDto} from '../models/student-file.model';

@Injectable({
  providedIn: 'root',
})
export class StudentFileService {
  private apiUrl = 'http://localhost:5146/api/StudentFiles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudentFileDto[]> {
    return this.http.get<StudentFileDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<StudentFileDto> {
    return this.http.get<StudentFileDto>(`${this.apiUrl}/${id}`);
  }

  upload(dto: CreateStudentFileDto): Observable<StudentFileDto> {
    const formData = new FormData();
    formData.append('studentId', dto.studentId);
    formData.append('file', dto.file);
    return this.http.post<StudentFileDto>(this.apiUrl, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
