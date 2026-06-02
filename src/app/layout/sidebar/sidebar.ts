import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  navItems = [
    { icon: '📊', label: 'Dashboard',      active: true  },
    { icon: '✅', label: 'Asistencia',     active: false },
    { icon: '📝', label: 'Calificaciones', active: false },
    { icon: '👥', label: 'Estudiantes',    active: false },
    { icon: '⚙️', label: 'Configuración',  active: false },
  ];
}