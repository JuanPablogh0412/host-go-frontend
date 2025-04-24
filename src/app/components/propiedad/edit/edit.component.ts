import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PropiedadService } from '../../../services/propiedad/propiedad.service';

@Component({
  selector: 'app-propiedad-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PropiedadEditComponent implements OnInit {
  propiedadForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  id!: number;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propiedadService: PropiedadService
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

  async ngOnInit(): Promise<void> {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const prop = await this.propiedadService.obtenerPorId(this.id);
      if (prop) {
        this.propiedadForm.patchValue(prop);
      } else {
        this.errorMessage = 'Propiedad no encontrada.';
      }
    } catch {
      this.errorMessage = 'Error al cargar la propiedad.';
    } finally {
      this.loading = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.propiedadForm.invalid) return;
    try {
      await this.propiedadService.actualizarPropiedad({
        propiedadId: this.id,
        ...this.propiedadForm.value
      } as any);
      this.successMessage = 'Propiedad actualizada exitosamente.';
      setTimeout(() => this.router.navigate(['/mis-propiedades']), 1000);
    } catch {
      this.errorMessage = 'Error al actualizar la propiedad.';
    }
  }
}
