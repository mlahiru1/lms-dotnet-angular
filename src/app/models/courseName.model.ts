export interface CourseDto {
  courseId: string;
  courseName: string;
  assignment: string;
}

export interface CreateCourseDto {
  courseId: string;
  courseName: string;
  assignment: string;
}

export interface UpdateCourseDto {
  courseName: string;
  assignment: string;
}

export interface CourseNameDto {
  courseName: string;
}
