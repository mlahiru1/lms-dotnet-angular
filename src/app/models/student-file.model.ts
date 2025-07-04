export interface CreateStudentFileDto {
  studentId: string;
  file: File;
}

export interface StudentFileDto {
  id: number;
  studentId: string;
  fileName: string;
  filePath: string;
  uploadedAt: string; 
}
