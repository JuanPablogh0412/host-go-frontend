import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrendadorService } from '../../../services/arrendador.service';
import { ArrendadorCreate } from '../../../models/arrendador-create.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-arrendador-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ArrendadorCreateComponent {

  arrendadorForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private arrendadorService: ArrendadorService) {
    this.arrendadorForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.arrendadorForm.invalid) {
      return;
    }

    const arrendadorData: ArrendadorCreate = this.arrendadorForm.value;

    try {
      const res = await this.arrendadorService.createArrendador(arrendadorData);
      if (res) {
        this.successMessage = 'Arrendador creado correctamente';
        this.errorMessage = '';
        this.arrendadorForm.reset();
      } else {
        this.errorMessage = 'No se pudo crear el arrendador';
        this.successMessage = '';
      }
    } catch (error) {
      this.errorMessage = 'Error inesperado al crear arrendador';
      this.successMessage = '';
    }
  }
}
