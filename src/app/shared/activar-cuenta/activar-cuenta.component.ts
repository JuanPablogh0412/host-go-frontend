// src/app/shared/activar-cuenta/activar-cuenta.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [
    CommonModule, RouterModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent implements OnInit {
  mensaje = '';
  exito = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.mensaje = 'Token inválido o no proporcionado.';
      return;
    }

    this.http
      .get(`http://localhost:8080/auth/activate?token=${token}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.exito = true;
          this.mensaje = '¡Tu cuenta ha sido activada exitosamente!';
        },
        error: () => {
          this.exito = false;
          this.mensaje = 'Hubo un problema al activar tu cuenta. Intenta más tarde.';
        }
      });
  }
}
