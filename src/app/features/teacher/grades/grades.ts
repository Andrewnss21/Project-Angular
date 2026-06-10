import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Agrega esta interfaz
interface StudentGrades {
  [key: string]: number;
}

interface Student {
  id: number;
  name: string;
  grades: StudentGrades;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.html',
})
export class GradesComponent {

  saved = signal(false);

  materias = ['Matemáticas', 'Lenguaje', 'Ciencias', 'Historia', 'Inglés'];

  students = signal<Student[]>([
    { id: 1, name: 'Ana Torres',     grades: { 'Matemáticas': 9.0, 'Lenguaje': 8.5, 'Ciencias': 9.2, 'Historia': 8.0, 'Inglés': 9.5 } },
    { id: 2, name: 'Luis Mendoza',   grades: { 'Matemáticas': 7.5, 'Lenguaje': 8.0, 'Ciencias': 7.0, 'Historia': 8.5, 'Inglés': 7.8 } },
    { id: 3, name: 'Carla Ruiz',     grades: { 'Matemáticas': 8.5, 'Lenguaje': 9.0, 'Ciencias': 8.8, 'Historia': 9.2, 'Inglés': 8.0 } },
    { id: 4, name: 'Pedro Salinas',  grades: { 'Matemáticas': 6.5, 'Lenguaje': 7.0, 'Ciencias': 6.8, 'Historia': 7.5, 'Inglés': 6.0 } },
    { id: 5, name: 'Valeria Mora',   grades: { 'Matemáticas': 9.5, 'Lenguaje': 9.2, 'Ciencias': 9.8, 'Historia': 9.0, 'Inglés': 9.7 } },
    { id: 6, name: 'Diego Castillo', grades: { 'Matemáticas': 8.0, 'Lenguaje': 7.5, 'Ciencias': 8.2, 'Historia': 8.0, 'Inglés': 7.0 } },
    { id: 7, name: 'Sofía Paredes',  grades: { 'Matemáticas': 7.0, 'Lenguaje': 8.5, 'Ciencias': 7.5, 'Historia': 8.8, 'Inglés': 8.2 } },
    { id: 8, name: 'Mateo Jiménez',  grades: { 'Matemáticas': 6.0, 'Lenguaje': 6.5, 'Ciencias': 7.0, 'Historia': 6.8, 'Inglés': 6.5 } },
  ]);

  getAverage(grades: StudentGrades): number {
    const values = Object.values(grades);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(avg * 10) / 10;
  }

  getGradeColor(grade: number): string {
    if (grade >= 9) return 'text-green-600';
    if (grade >= 7) return 'text-amber-500';
    return 'text-red-500';
  }

  updateGrade(studentId: number, materia: string, value: string) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > 10) return;
    this.students.update(list =>
      list.map(s => s.id === studentId
        ? { ...s, grades: { ...s.grades, [materia]: num } }
        : s
      )
    );
    this.saved.set(false);
  }

  classAverage = computed(() => {
    const all = this.students().map(s => this.getAverage(s.grades));
    return Math.round((all.reduce((a, b) => a + b, 0) / all.length) * 10) / 10;
  });

  saveGrades() {
    console.log('Guardando calificaciones:', this.students());
    this.saved.set(true);
  }
}