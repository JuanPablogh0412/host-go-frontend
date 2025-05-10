// src/app/shared/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginRequest } from '../../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Inicializamos el formulario aquí
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const creds: LoginRequest = this.form.value;
    this.auth.login(creds).subscribe({
      next: res => {
        if (res.token) {
          // Guarda el JWT para peticiones futuras
          localStorage.setItem('token', res.token);
          // Opcional: guarda también el objeto de usuario
          localStorage.setItem('user', JSON.stringify(res.arrendador || res.arrendatario));
          // Navega al Home o al dashboard protegido
          this.router.navigate(['/']);
        } else {
          this.errorMessage = res.error || 'Error desconocido';
        }
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Credenciales inválidas';
      }
    });
  }
  
}
