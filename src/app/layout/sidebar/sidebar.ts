import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {

  constructor(private router: Router) {}

  get isTeacher(): boolean {
    const url = this.router.url;
    return url.startsWith('/teacher');
  }

  get navItems() {
    if (this.isTeacher) {
      return [
        { icon: '📊', label: 'Dashboard',      route: '/teacher/dashboard'  },
        { icon: '✅', label: 'Asistencia',     route: '/teacher/attendance' },
        { icon: '📝', label: 'Calificaciones', route: '/teacher/grades'     },
        { icon: '👥', label: 'Estudiantes',    route: '/teacher/students'   },
      ];
    } else {
      return [
        { icon: '📊', label: 'Dashboard', route: '/parent/dashboard' },
      ];
    }
  }
}