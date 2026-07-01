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

  // Lista de estudiantes
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

  // Métricas calculadas
  totalStudents  = computed(() => this.students().length);
  presentToday   = computed(() => this.students().filter(s => s.status === 'Presente').length);
  absentToday    = computed(() => this.students().filter(s => s.status === 'Ausente').length);
  attendanceRate = computed(() => Math.round((this.presentToday() / this.totalStudents()) * 100));

  // Búsqueda y filtro
  searchTerm  = signal('');
  filterStatus = signal<'Todos' | 'Presente' | 'Ausente'>('Todos');

  filteredStudents = computed(() => {
    return this.students().filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchesFilter = this.filterStatus() === 'Todos' || s.status === this.filterStatus();
      return matchesSearch && matchesFilter;
    });
  });

  // Datos para la gráfica
  weekData = [
    { day: 'Lun', present: 26, absent: 2 },
    { day: 'Mar', present: 24, absent: 4 },
    { day: 'Mié', present: 27, absent: 1 },
    { day: 'Jue', present: 23, absent: 5 },
    { day: 'Vie', present: this.students().filter(s => s.status === 'Presente').length, absent: this.students().filter(s => s.status === 'Ausente').length },
  ];

  maxPresent = Math.max(...this.weekData.map(d => d.present));

  // ===== Lógica de la gráfica SVG =====

  hoverIndex = signal<number | null>(null);

  private chartLeft = 50;
  private chartRight = 730;
  private chartTop = 20;
  private chartBottom = 220;

  private getX(index: number): number {
    const step = (this.chartRight - this.chartLeft) / (this.weekData.length - 1);
    return this.chartLeft + step * index;
  }

  private getY(value: number): number {
    const scale = (this.chartBottom - this.chartTop) / this.maxPresent;
    return this.chartBottom - (value * scale);
  }

  get gridLines() {
    const steps = 5;
    return Array.from({ length: steps }, (_, i) => {
      const value = Math.round((this.maxPresent / (steps - 1)) * (steps - 1 - i));
      return { y: this.chartTop + ((this.chartBottom - this.chartTop) / (steps - 1)) * i, label: value };
    });
  }

  get presentPoints() {
    return this.weekData.map((d, i) => ({ x: this.getX(i), y: this.getY(d.present) }));
  }

  get absentPoints() {
    return this.weekData.map((d, i) => ({ x: this.getX(i), y: this.getY(d.absent) }));
  }

  private toPath(points: { x: number; y: number }[]): string {
    return points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ' ' + p.y).join(' ');
  }

  get presentLinePath(): string {
    return this.toPath(this.presentPoints);
  }

  get absentLinePath(): string {
    return this.toPath(this.absentPoints);
  }

  get presentAreaPath(): string {
    const points = this.presentPoints;
    const first = points[0];
    const last = points[points.length - 1];
    return `${this.toPath(points)} L ${last.x} ${this.chartBottom} L ${first.x} ${this.chartBottom} Z`;
  }

  get absentAreaPath(): string {
    const points = this.absentPoints;
    const first = points[0];
    const last = points[points.length - 1];
    return `${this.toPath(points)} L ${last.x} ${this.chartBottom} L ${first.x} ${this.chartBottom} Z`;
  }

tooltipX = computed(() => {
  const i = this.hoverIndex();
  if (i === null) return 0;
  // Posición X como porcentaje del ancho total del SVG (viewBox 760)
  const x = this.presentPoints[i].x;
  return ((x - 50) / (730 - 50)) * 100;
});
  tooltipY = computed(() => {
    const i = this.hoverIndex();
    if (i === null) return 0;
    return ((this.presentPoints[i].y - 60) / 260) * 100;
  });

  mouseX = 0;
mouseY = 0;

onChartMouseMove(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  // Posición del mouse relativa al contenedor
  this.mouseX = event.clientX - rect.left;
  this.mouseY = event.clientY - rect.top;

  // Determinar qué punto está más cercano al mouse
  const svgWidth = rect.width;
  const relativeX = (event.clientX - rect.left) / svgWidth;
  const svgX = 50 + relativeX * (730 - 50);

  // Encontrar el índice más cercano
  let closestIndex = 0;
  let minDistance = Infinity;
  this.presentPoints.forEach((p, i) => {
    const dist = Math.abs(p.x - svgX);
    if (dist < minDistance) {
      minDistance = dist;
      closestIndex = i;
    }
  });

  this.hoverIndex.set(closestIndex);
}
}