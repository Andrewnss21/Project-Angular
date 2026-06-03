import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';
  rol: 'docente' | 'representante' = 'docente';

  onLogin() {
    console.log('Login:', this.email, this.rol);
    // Aquí conectaremos el backend más adelante
  }
}