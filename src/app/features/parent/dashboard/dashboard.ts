import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class ParentDashboardComponent {

  today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  child = {
    name: 'Carlos Pérez',
    course: '3ro "A"',
    teacher: 'María Andrade',
    attendanceRate: 92,
    average: 8.2,
  };

  attendance = signal([
    { date: 'Lunes 16 jun',    status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza', time: '07:45' },
    { date: 'Martes 17 jun',   status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza', time: '07:48' },
    { date: 'Miércoles 18 jun',status: 'Tardanza' as 'Presente' | 'Ausente' | 'Tardanza', time: '08:15' },
    { date: 'Jueves 19 jun',   status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza', time: '07:50' },
    { date: 'Viernes 20 jun',  status: 'Ausente'  as 'Presente' | 'Ausente' | 'Tardanza', time: '—'     },
    { date: 'Lunes 23 jun',    status: 'Presente' as 'Presente' | 'Ausente' | 'Tardanza', time: '07:44' },
  ]);

  grades = [
    { subject: 'Matemáticas', grade: 8.5, trend: '↑' },
    { subject: 'Lenguaje',    grade: 9.0, trend: '↑' },
    { subject: 'Ciencias',    grade: 7.8, trend: '↓' },
    { subject: 'Historia',    grade: 8.0, trend: '→' },
    { subject: 'Inglés',      grade: 7.5, trend: '↓' },
  ];

  getStatusColor(status: string): string {
    if (status === 'Presente') return 'bg-green-50 text-green-700';
    if (status === 'Tardanza') return 'bg-amber-50 text-amber-700';
    return 'bg-red-50 text-red-600';
  }

  getGradeColor(grade: number): string {
    if (grade >= 9)  return 'text-green-600';
    if (grade >= 7)  return 'text-amber-500';
    return 'text-red-500';
  }

  getTrendColor(trend: string): string {
    if (trend === '↑') return 'text-green-500';
    if (trend === '↓') return 'text-red-400';
    return 'text-gray-400';
  }
}