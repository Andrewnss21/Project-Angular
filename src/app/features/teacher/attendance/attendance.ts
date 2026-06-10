import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.html',
})
export class AttendanceComponent {

  today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  saved = signal(false);

  students = signal([
    { id: 1, name: 'Ana Torres',      status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 2, name: 'Luis Mendoza',    status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 3, name: 'Carla Ruiz',      status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 4, name: 'Pedro Salinas',   status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 5, name: 'Valeria Mora',    status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 6, name: 'Diego Castillo',  status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 7, name: 'Sofía Paredes',   status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
    { id: 8, name: 'Mateo Jiménez',   status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza' },
  ]);

  totalPresente  = computed(() => this.students().filter(s => s.status === 'Presente').length);
  totalAusente   = computed(() => this.students().filter(s => s.status === 'Ausente').length);
  totalTardanza  = computed(() => this.students().filter(s => s.status === 'Tardanza').length);

  setStatus(id: number, status: 'Presente' | 'Ausente' | 'Tardanza') {
    this.students.update(list =>
      list.map(s => s.id === id ? { ...s, status } : s)
    );
    this.saved.set(false);
  }

  markAll(status: 'Presente' | 'Ausente') {
    this.students.update(list => list.map(s => ({ ...s, status })));
    this.saved.set(false);
  }

  saveAttendance() {
    // Aquí irá la llamada al backend cuando esté listo
    console.log('Guardando asistencia:', this.students());
    this.saved.set(true);
  }
}