import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { teacherGuard, parentGuard } from './core/guards/role.guard';
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
    canActivate: [authGuard, teacherGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',  component: TeacherDashboardComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'grades',     component: GradesComponent },
      { path: 'students',   component: StudentsComponent },
    ]
  },
  {
    path: 'parent',
    component: MainLayoutComponent,
    canActivate: [authGuard, parentGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ParentDashboardComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];