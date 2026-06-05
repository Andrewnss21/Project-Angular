import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { TeacherDashboardComponent } from './features/teacher/dashboard/dashboard';
import { AttendanceComponent } from './features/teacher/attendance/attendance';
import { GradesComponent } from './features/teacher/grades/grades';
import { StudentsComponent } from './features/teacher/students/students';
import { ParentDashboardComponent } from './features/parent/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'teacher',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',   component: TeacherDashboardComponent },
      { path: 'attendance',  component: AttendanceComponent },
      { path: 'grades',      component: GradesComponent },
      { path: 'students',    component: StudentsComponent },
    ]
  },
  {
    path: 'parent',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ParentDashboardComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];