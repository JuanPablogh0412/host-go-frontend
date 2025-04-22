import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrendatarioService } from '../../../services/arrendatario.service';
import { ArrendatarioCreate } from '../../../models/arrendatario-create.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-arrendatario-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ArrendatarioCreateComponent {

  arrendatarioForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private arrendatarioService: ArrendatarioService) {
    this.arrendatarioForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.arrendatarioForm.invalid) {
      this.arrendatarioForm.markAllAsTouched();
      return;
    }

    const arrendatarioData: ArrendatarioCreate = this.arrendatarioForm.value;

    try {
      const res = await this.arrendatarioService.createArrendatario(arrendatarioData);
      if (res) {
        this.successMessage = 'Cuenta creada correctamente! Revisa tu correo para activar tu cuenta.';
        this.errorMessage = '';
        this.arrendatarioForm.reset();
      } else {
        this.errorMessage = 'No se pudo crear tu cuenta. Intenta nuevamente.';
        this.successMessage = '';
      }
    } catch (error: any) {
      this.errorMessage = error?.error || 'Error inesperado al crear la cuenta. Por favor, intenta nuevamente.';
      this.successMessage = '';
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.arrendatarioForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
