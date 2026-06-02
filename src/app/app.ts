import { Component } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { HeaderComponent } from './layout/header/header';
import { TeacherDashboardComponent } from './features/teacher/dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, TeacherDashboardComponent],
  templateUrl: './app.html',
})
export class AppComponent {}