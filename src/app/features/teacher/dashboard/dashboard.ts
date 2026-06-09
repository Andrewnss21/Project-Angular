import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class TeacherDashboardComponent {

  // Fecha dinámica
  today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Lista de estudiantes como signal (reactivo)
  students = signal([
    { id: 1, name: 'Ana Torres',      status: 'Presente' as 'Presente'|'Ausente', time: '07:45' },
    { id: 2, name: 'Luis Mendoza',    status: 'Presente' as 'Presente'|'Ausente', time: '07:48' },
    { id: 3, name: 'Carla Ruiz',      status: 'Ausente'  as 'Presente'|'Ausente', time: '—'     },
    { id: 4, name: 'Pedro Salinas',   status: 'Presente' as 'Presente'|'Ausente', time: '07:52' },
    { id: 5, name: 'Valeria Mora',    status: 'Ausente'  as 'Presente'|'Ausente', time: '—'     },
    { id: 6, name: 'Diego Castillo',  status: 'Presente' as 'Presente'|'Ausente', time: '07:55' },
    { id: 7, name: 'Sofía Paredes',   status: 'Presente' as 'Presente'|'Ausente', time: '07:58' },
    { id: 8, name: 'Mateo Jiménez',   status: 'Ausente'  as 'Presente'|'Ausente', time: '—'     },
  ]);

  // Métricas calculadas automáticamente
  totalStudents  = computed(() => this.students().length);
  presentToday   = computed(() => this.students().filter(s => s.status === 'Presente').length);
  absentToday    = computed(() => this.students().filter(s => s.status === 'Ausente').length);
  attendanceRate = computed(() => Math.round((this.presentToday() / this.totalStudents()) * 100));

  // Búsqueda y filtro
  searchTerm  = signal('');
  filterStatus = signal<'Todos' | 'Presente' | 'Ausente'>('Todos');

  // Lista filtrada
  filteredStudents = computed(() => {
    return this.students().filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchesFilter = this.filterStatus() === 'Todos' || s.status === this.filterStatus();
      return matchesSearch && matchesFilter;
    });
  });

  // Datos para la gráfica (asistencia de la semana)
  weekData = [
    { day: 'Lun', present: 26, absent: 2 },
    { day: 'Mar', present: 24, absent: 4 },
    { day: 'Mié', present: 27, absent: 1 },
    { day: 'Jue', present: 23, absent: 5 },
    { day: 'Vie', present: this.students().filter(s => s.status === 'Presente').length, absent: this.students().filter(s => s.status === 'Ausente').length },
  ];

  maxPresent = Math.max(...this.weekData.map(d => d.present));
}