export interface CreateTeacherDto {
  teacherId: string;
  username: string;
  name: string;
  subject: string;
  email?: string;
  phone?: string;
}
