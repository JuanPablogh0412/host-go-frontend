import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CalificacionService } from '../../../services/calificacion.service';
import { Calificacion } from '../../../models/calificacion.model';

@Component({
  selector: 'app-calificar-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './calificar-cuenta.component.html',
  styleUrls: ['./calificar-cuenta.component.css']
})
export class CalificarCuentaComponent implements OnInit {
  cuentaId!: number;
  caliForm: FormGroup;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private caliSvc: CalificacionService,
    private router: Router
  ) {
    this.caliForm = this.fb.group({
      estrellas:  [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cuentaId = +this.route.snapshot.paramMap.get('id')!;
  }

  isInvalid(control: string): boolean {
    const c = this.caliForm.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  async submit(): Promise<void> {
    if (this.caliForm.invalid) {
      this.caliForm.markAllAsTouched();
      return;
    }
    this.error = this.success = '';
    const { estrellas, comentario } = this.caliForm.value;

    const payload = {
      estrellas,
      comentario,
      cuenta: { cuentaId: this.cuentaId }
    } as Calificacion;

    try {
      await this.caliSvc.crearCalificacion(payload);
      this.success = '¡Gracias por tu calificación!';
      setTimeout(() => this.router.navigate(['/cuenta', this.cuentaId]), 1500);
    } catch (e: any) {
      this.error = e.response?.data?.error || 'Error al enviar la calificación.';
    }
  }
}
