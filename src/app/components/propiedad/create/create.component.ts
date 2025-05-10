import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { PropiedadService } from '../../../services/propiedad/propiedad.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-propiedad-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe, RouterModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class PropiedadCreateComponent implements OnInit {
  propiedadForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private router: Router
  ) {
    this.propiedadForm = this.fb.group({
      nombre: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      habitaciones: [1, [Validators.required, Validators.min(1)]],
      banos: [1, [Validators.required, Validators.min(1)]],
      permiteMascotas: [false],
      tienePiscina: [false],
      tieneAsador: [false],
      valorNoche: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.propiedadForm.invalid || this.submitting) return;
    this.submitting = true;
    try {
      await this.propiedadService.crearPropiedad(this.propiedadForm.value);
      this.successMessage = 'Propiedad creada exitosamente.';
      setTimeout(() => this.router.navigate(['/mis-propiedades']), 1000);
    } catch {
      this.errorMessage = 'Error al crear la propiedad.';
    } finally {
      this.submitting = false;
    }
  }
}
