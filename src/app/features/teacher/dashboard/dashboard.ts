import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class TeacherDashboardComponent {
  statCards = [
    { label: 'Total estudiantes', value: '28',  trend: '↑ 2 nuevos este mes',   positive: true  },
    { label: 'Presentes hoy',     value: '24',  trend: '85.7% asistencia',       positive: true  },
    { label: 'Ausentes hoy',      value: '4',   trend: '↑ 1 más que ayer',       positive: false },
    { label: 'Promedio general',  value: '8.4', trend: '↑ 0.2 vs mes anterior',  positive: true  },
  ];

  students = [
    { name: 'Ana Torres',     status: 'Presente', time: '07:45' },
    { name: 'Luis Mendoza',   status: 'Presente', time: '07:48' },
    { name: 'Carla Ruiz',     status: 'Ausente',  time: '—'     },
    { name: 'Pedro Salinas',  status: 'Presente', time: '07:52' },
    { name: 'Valeria Mora',   status: 'Ausente',  time: '—'     },
    { name: 'Diego Castillo', status: 'Presente', time: '07:55' },
  ];
}