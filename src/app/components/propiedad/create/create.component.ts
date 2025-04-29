// src/app/components/propiedad/create/propiedad-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { Status } from '../../../models/status.enum';
import { AuthService } from '../../../services/auth/login.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-propiedad-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class PropiedadCreateComponent implements OnInit {
  form: FormGroup;
  ubicaciones: { departamento: string; municipio: string }[] = [];
  departamentos: string[] = [];
  municipios: string[] = [];
  success = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private svc: PropiedadService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
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

  async ngOnInit() {
    try {
      this.ubicaciones = await this.svc.obtenerUbicaciones();
      this.departamentos = Array.from(
        new Set(this.ubicaciones.map(u => u.departamento))
      ).sort();
    } catch {
      this.error = 'No fue posible cargar ubicaciones';
    }
  }

  onDeptoChange() {
    const dep = this.form.value.departamento;
    this.municipios = this.ubicaciones
      .filter(u => u.departamento === dep)
      .map(u => u.municipio)
      .sort();
    this.form.patchValue({ municipio: '' });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = localStorage.getItem('user');
    if (!raw) {
      this.error = 'Debes iniciar sesión primero';
      return;
    }
    const arr = JSON.parse(raw) as any;

    const nueva: Propiedad = {
      propiedadId: 0,
      ...this.form.value,
      status: Status.ACTIVE,
      arrendador: {
        arrendadorId: arr.arrendadorId,
        cedula:      arr.cedula,
        nombre:      arr.nombre,
        apellido:    arr.apellido,
        correo:      arr.correo,
        telefono:    arr.telefono,
        status:      Status.ACTIVE,
        cuenta:      arr.cuenta
      },
      fotos: []
    };

    try {
      const creado = await this.svc.crearPropiedad(nueva);
      // aquí redirigimos al paso de subir fotos
      this.router.navigate(['/propiedad', creado.propiedadId, 'fotos']);
    } catch (e: any) {
      this.error = e.response?.data?.error || 'Error al crear propiedad';
      this.success = '';
    }
  }

  isInvalid(c: string) {
    const ctrl = this.form.get(c);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }
}
