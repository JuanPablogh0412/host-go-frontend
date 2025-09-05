import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CaliPropiedadService } from '../../../services/cali-propiedad.service';
import { CaliPropiedad }        from '../../../models/caliPropiedad.model';

@Component({
  selector: 'app-calificar-propiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './calificar-propiedad.component.html',
  styleUrls: ['./calificar-propiedad.component.css']
})
export class CalificarPropiedadComponent implements OnInit {
  caliForm: FormGroup;
  error = '';
  success = '';

  propiedadId!: number;

  constructor(
    private route: ActivatedRoute,
    fb: FormBuilder,
    private svc: CaliPropiedadService,
    private router: Router
  ) {
    this.caliForm = fb.group({
      estrellas:   [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario:  ['', Validators.required]
    });
  }

  ngOnInit() {
    this.propiedadId = +this.route.snapshot.paramMap.get('id')!;
  }

  isInvalid(control: string): boolean {
    const c = this.caliForm.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  async submit() {
    if (this.caliForm.invalid) {
      this.caliForm.markAllAsTouched();
      return;
    }
    this.error = this.success = '';
    const { estrellas, comentario } = this.caliForm.value;
    try {
      await this.svc.crearCalificacion({
        estrellas,
        comentario,
        propiedad: { propiedadId: this.propiedadId } as any
      });
      this.success = '¡Gracias por tu calificación!';
      setTimeout(() => this.router.navigate(['/propiedad', this.propiedadId]), 1500);
    } catch (e: any) {
      this.error = e.response?.data?.error || 'Error al enviar tu calificación';
    }
  }
}
