import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/courseName.service';
import { CourseDto } from '../../models/courseName.model';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courseName.component.html',
  
})
export class CourseNameComponent implements OnInit {
  courses: CourseDto[] = [];
  newCourse = { courseId: '', courseName: '' };
  selectedCourseId: string = '';
  updateName = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAll().subscribe((data) => {
      this.courses = data.map(c => ({
        courseId: c.courseId,
        courseName: c.courseName,
        assignment: '' // ignore assignment here
      }));
    });
  }

  createCourse() {
    this.courseService.create({
      courseId: this.newCourse.courseId,
      courseName: this.newCourse.courseName,
      assignment: ''
    }).subscribe(() => {
      this.newCourse = { courseId: '', courseName: '' };
      this.getAllCourses();
    });
  }

  startEdit(course: CourseDto) {
    this.selectedCourseId = course.courseId;
    this.updateName = course.courseName;
  }

  updateCourse() {
    this.courseService.update(this.selectedCourseId, {
      courseName: this.updateName,
      assignment: '' // leave unchanged
    }).subscribe(() => {
      this.cancelEdit();
      this.getAllCourses();
    });
  }

  deleteCourse(id: string) {
    this.courseService.delete(id).subscribe(() => this.getAllCourses());
  }

  cancelEdit() {
    this.selectedCourseId = '';
    this.updateName = '';
  }
}
