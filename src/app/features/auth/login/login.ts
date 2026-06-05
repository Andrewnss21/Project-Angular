import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  username = '';
  password = '';
  rol: 'docente' | 'representante' = 'docente';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) return;

    if (this.rol === 'docente') {
      this.router.navigate(['/teacher/dashboard']);
    } else {
      this.router.navigate(['/parent/dashboard']);
    }
  }
}