import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './components/shared/auth.guard';
import { LoginComponent } from './components/auth/login/login.components';
import { StudentComponent } from './components/student/student.component';
import { GradingComponent } from './components/grading/grading.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { TeacherEnrollmentComponent } from './components/teacher-enrollment/teacher-enrollment.component';
import { StudentCourseList } from './components/student-course-list/student-course-list.component';
import { TeacherCourseList } from './components/teacher-course-list/teacher-course-list.component';
import { AssignmentManagerComponent } from './components/assignment-manager/assignment-manager.component';
import { AssignmentViewerComponent } from './components/assignment-view/assignment-view.component';
import { UploadedFilesComponent } from './components/Upload-files/uploaded-files.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ViewNotificationsComponent } from './components/view-notification/view-notification.component';
import { CourseNameComponent } from './components/course-names/courseName.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] ,
    children: [
      { path: 'course-name-assign', component: CourseNameComponent},
      { path: 'student-course-list', component: StudentCourseList },
      { path: 'teacher-course-list', component: TeacherCourseList},
      { path: 'teacher-courses/:courseId', component: AssignmentManagerComponent },
      { path: 'student-courses/:courseId', component: AssignmentViewerComponent },
      { path: 'grading', component: GradingComponent },
      { path: 'files', component: UploadedFilesComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'student-notifications', component: ViewNotificationsComponent },
      { path: 'student-details', component: StudentComponent },
      { path: 'teacher-details', component: TeacherComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'enroll-student', component: EnrollmentComponent },
      { path: 'enroll-teacher', component: TeacherEnrollmentComponent },

    ]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];