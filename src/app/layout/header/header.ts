import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
})
export class HeaderComponent {

  today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  pageTitle = 'Dashboard';

  private routeTitles: Record<string, string> = {
    '/teacher/dashboard':  'Dashboard',
    '/teacher/attendance': 'Registro de Asistencia',
    '/teacher/grades':     'Calificaciones',
    '/teacher/students':   'Estudiantes',
    '/parent/dashboard':   'Mi Portal',
  };

  constructor(private router: Router) {
    this.pageTitle = this.routeTitles[this.router.url] || 'Dashboard';
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.pageTitle = this.routeTitles[event.urlAfterRedirects] || 'Dashboard';
    });
  }

  private getUserFromStorage() {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  }

  get initials(): string {
    const user = this.getUserFromStorage();
    if (!user) return 'U';
    return (user.username || 'U').substring(0, 2).toUpperCase();
  }

  get username(): string {
    const user = this.getUserFromStorage();
    return user?.username || 'Usuario';
  }

  get role(): string {
    const user = this.getUserFromStorage();
    if (!user) return '';
    if (user.roles?.includes('ROLE_PROFESOR') || user.roles?.includes('ROLE_ADMIN')) return 'Docente';
    if (user.roles?.includes('ROLE_PADRE')) return 'Representante';
    return '';
  }
}