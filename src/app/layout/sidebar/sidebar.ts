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