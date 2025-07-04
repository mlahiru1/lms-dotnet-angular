export interface CreateStudentDto {
  studentId: string;
  username: string;
  name: string;
  address: string;
  email?: string;
  phone?: string;
}
