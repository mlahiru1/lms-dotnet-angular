import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface GetIdResponse {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetIdService {
  private baseUrl = 'http://localhost:5146/api/GetId';

  constructor(private http: HttpClient) {}

  getStudentIdByUsername(username: string): Observable<GetIdResponse> {
    return this.http.get<GetIdResponse>(`${this.baseUrl}/student/${username}`);
  }

  getTeacherIdByUsername(username: string): Observable<GetIdResponse> {
    return this.http.get<GetIdResponse>(`${this.baseUrl}/teacher/${username}`);
  }
}
