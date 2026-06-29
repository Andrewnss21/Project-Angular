import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {

  menuOpen = signal(false);

  private icons = {
    dashboard:    `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
    attendance:   `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
    grades:       `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    students:     `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    portal:       `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
  };

  constructor(private router: Router) {}

  private getUserFromStorage() {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  }

  get isTeacher(): boolean {
    const user = this.getUserFromStorage();
    if (!user) return false;
    return user.roles.includes('ROLE_PROFESOR') || user.roles.includes('ROLE_ADMIN');
  }

  get isParent(): boolean {
    const user = this.getUserFromStorage();
    if (!user) return false;
    return user.roles.includes('ROLE_PADRE');
  }

  get navItems(): NavItem[] {
    if (this.isTeacher) {
      return [
        { icon: this.icons.dashboard,  label: 'Dashboard',      route: '/teacher/dashboard'  },
        { icon: this.icons.attendance, label: 'Asistencia',     route: '/teacher/attendance' },
        { icon: this.icons.grades,     label: 'Calificaciones', route: '/teacher/grades'     },
        { icon: this.icons.students,   label: 'Estudiantes',    route: '/teacher/students'   },
      ];
    }
    if (this.isParent) {
      return [
        { icon: this.icons.portal, label: 'Mi Portal', route: '/parent/dashboard' },
      ];
    }
    return [];
  }

  get currentUser() {
    const user = this.getUserFromStorage();
    if (!user) return { name: 'Usuario', role: 'Sin rol' };
    return {
      name: user.username || 'Usuario',
      role: this.isTeacher ? 'Docente' : this.isParent ? 'Representante' : 'Usuario'
    };
  }

  get initials(): string {
    return this.currentUser.name.substring(0, 2).toUpperCase();
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