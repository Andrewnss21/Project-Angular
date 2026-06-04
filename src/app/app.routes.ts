import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { TeacherDashboardComponent } from './features/teacher/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'teacher',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];