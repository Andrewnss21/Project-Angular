import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {

  menuOpen = signal(false);

  constructor(private router: Router) {}

  get isTeacher(): boolean {
    return this.router.url.startsWith('/teacher');
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

  get currentUser() {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      const user = JSON.parse(stored);
      return {
        name: user.username || 'Usuario',
        role: this.isTeacher ? 'Docente' : 'Representante'
      };
    }
    return { name: 'Usuario', role: this.isTeacher ? 'Docente' : 'Representante' };
  }

  get initials(): string {
    const name = this.currentUser.name;
    return name.substring(0, 2).toUpperCase();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.router.navigate(['/login']);
  }
}