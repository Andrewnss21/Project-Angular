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
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    // Token simulado hasta conectar el backend
    localStorage.setItem('auth_token', 'fake-token-123');
    localStorage.setItem('auth_user', JSON.stringify({
      username: this.username,
      roles: this.rol === 'docente' ? ['ROLE_PROFESOR'] : ['ROLE_PADRE']
    }));

    if (this.rol === 'docente') {
      this.router.navigate(['/teacher/dashboard']);
    } else {
      this.router.navigate(['/parent/dashboard']);
    }
  }
}