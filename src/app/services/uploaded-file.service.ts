import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UploadedFileDto {
  id: number;
  username: string;
  fileName: string;
  fileData: string; // base64 or Blob (only when downloading)
  createdDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UploadedFileService {
  private baseUrl = 'http://localhost:5146/api/uploadedfiles'; 

  constructor(private http: HttpClient) {}

  uploadFile(username: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('File', file);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getAll(): Observable<UploadedFileDto[]> {
    return this.http.get<UploadedFileDto[]>(this.baseUrl);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getById(id: number): Observable<UploadedFileDto> {
    return this.http.get<UploadedFileDto>(`${this.baseUrl}/${id}`);
  }
}
