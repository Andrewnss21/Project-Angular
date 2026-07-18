import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  attendanceRate: number;
  average: number;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
})
export class StudentsComponent {

  searchTerm = signal('');
  selectedStudent = signal<Student | null>(null);

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchTerm.set(params['q']);
      }
    });
  }

  students = signal<Student[]>([
    { id: 1, name: 'Ana Torres',     email: 'ana.torres@colegio.edu',     phone: '0991-234-567', course: '3ro "A"', parentName: 'Roberto Torres',    parentPhone: '0987-111-222', parentEmail: 'roberto.torres@gmail.com',    attendanceRate: 96, average: 8.8 },
    { id: 2, name: 'Luis Mendoza',   email: 'luis.mendoza@colegio.edu',   phone: '0991-234-568', course: '3ro "A"', parentName: 'Carmen Mendoza',    parentPhone: '0987-111-223', parentEmail: 'carmen.mendoza@gmail.com',    attendanceRate: 89, average: 7.8 },
    { id: 3, name: 'Carla Ruiz',     email: 'carla.ruiz@colegio.edu',     phone: '0991-234-569', course: '3ro "A"', parentName: 'Jorge Ruiz',        parentPhone: '0987-111-224', parentEmail: 'jorge.ruiz@gmail.com',        attendanceRate: 78, average: 8.7 },
    { id: 4, name: 'Pedro Salinas',  email: 'pedro.salinas@colegio.edu',  phone: '0991-234-570', course: '3ro "A"', parentName: 'Mónica Salinas',    parentPhone: '0987-111-225', parentEmail: 'monica.salinas@gmail.com',    attendanceRate: 92, average: 6.8 },
    { id: 5, name: 'Valeria Mora',   email: 'valeria.mora@colegio.edu',   phone: '0991-234-571', course: '3ro "A"', parentName: 'Andrés Mora',       parentPhone: '0987-111-226', parentEmail: 'andres.mora@gmail.com',       attendanceRate: 99, average: 9.4 },
    { id: 6, name: 'Diego Castillo', email: 'diego.castillo@colegio.edu', phone: '0991-234-572', course: '3ro "A"', parentName: 'Patricia Castillo', parentPhone: '0987-111-227', parentEmail: 'patricia.castillo@gmail.com', attendanceRate: 94, average: 7.7 },
    { id: 7, name: 'Sofía Paredes',  email: 'sofia.paredes@colegio.edu',  phone: '0991-234-573', course: '3ro "A"', parentName: 'Luis Paredes',      parentPhone: '0987-111-228', parentEmail: 'luis.paredes@gmail.com',      attendanceRate: 91, average: 8.0 },
    { id: 8, name: 'Mateo Jiménez',  email: 'mateo.jimenez@colegio.edu',  phone: '0991-234-574', course: '3ro "A"', parentName: 'Diana Jiménez',     parentPhone: '0987-111-229', parentEmail: 'diana.jimenez@gmail.com',     attendanceRate: 85, average: 6.6 },
  ]);

  filteredStudents = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.students();
    return this.students().filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.parentName.toLowerCase().includes(term)
    );
  });

  openDetail(student: Student) {
    this.selectedStudent.set(student);
  }

  closeDetail() {
    this.selectedStudent.set(null);
  }

  getAttendanceColor(rate: number): string {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-amber-500';
    return 'text-red-500';
  }
}