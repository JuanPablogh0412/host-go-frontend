import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PropiedadService } from '../../../services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { Status } from '../../../models/status.enum';
import { AuthService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-propiedad-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './propiedad-edit.component.html',
  styleUrls: ['./propiedad-edit.component.css']
})
export class PropiedadEditComponent implements OnInit {
  form!: FormGroup;
  ubicaciones: { departamento: string; municipio: string }[] = [];
  departamentos: string[] = [];
  municipios: string[] = [];
  loading = true;
  error = '';
  success = '';
  desactivarError = '';
  desactivarSuccess = '';

  propiedadId!: number;

  constructor(
    private fb: FormBuilder,
    private svc: PropiedadService,
    private auth: AuthService,
    private route: ActivatedRoute,
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
    // 1) Cargar lista de departamentos/municipios
    try {
      this.ubicaciones = await this.svc.obtenerUbicaciones();
      this.departamentos = Array.from(
        new Set(this.ubicaciones.map((u) => u.departamento))
      ).sort();
    } catch {
      this.error = 'No se pudieron cargar ubicaciones';
    }

    // 2) Cargar datos de la propiedad a editar
    this.propiedadId = +this.route.snapshot.paramMap.get('id')!;
    try {
      const dto = await this.svc.obtenerPropiedad(this.propiedadId);
      if (!dto?.propiedadId) {
        this.error = 'Propiedad no encontrada';
      } else {
        // parchear opciones de municipio tras departamento
        this.form.patchValue({
          nombre: dto.nombre,
          departamento: dto.departamento,
          tipoIngreso: dto.tipoIngreso,
          descripcion: dto.descripcion,
          capacidad: dto.capacidad,
          habitaciones: dto.habitaciones,
          banos: dto.banos,
          permiteMascotas: dto.permiteMascotas,
          tienePiscina: dto.tienePiscina,
          tieneAsador: dto.tieneAsador,
          valorNoche: dto.valorNoche
        });
        this.onDeptoChange();
        this.form.patchValue({ municipio: dto.municipio });
      }
    } catch {
      this.error = 'Error cargando la propiedad';
    } finally {
      this.loading = false;
    }
  }

  onDeptoChange() {
    const dep = this.form.value.departamento;
    this.municipios = this.ubicaciones
      .filter((u) => u.departamento === dep)
      .map((u) => u.municipio)
      .sort();
    this.form.patchValue({ municipio: '' });
  }

  isInvalid(c: string) {
    const ctrl = this.form.get(c);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Construir payload con arrendador actual
    const raw = localStorage.getItem('user');
    if (!raw) {
      this.error = 'Debes iniciar sesión';
      return;
    }
    const arr = JSON.parse(raw);
    const updated: Propiedad = {
      propiedadId: this.propiedadId,
      ...this.form.value,
      status: Status.ACTIVE,
      arrendador: {
        arrendadorId: arr.arrendadorId,
        cedula: arr.cedula,
        nombre: arr.nombre,
        apellido: arr.apellido,
        correo: arr.correo,
        telefono: arr.telefono,
        status: Status.ACTIVE,
        cuenta: arr.cuenta
      },
      fotos: [] // no tocamos aquí
    };

    try {
      await this.svc.actualizarPropiedad(updated);
      this.success = 'Propiedad actualizada con éxito';
      this.error = '';
      // opcionalmente redirigir
      setTimeout(() => this.router.navigate(['/mis-propiedades']), 1000);
    } catch (e: any) {
      this.error = e.response?.data?.error || 'Error al actualizar';
      this.success = '';
    }
  }
  async onDesactivar() {
    this.desactivarError = this.desactivarSuccess = '';
    if (!confirm('¿Seguro que deseas desactivar esta propiedad?')) {
      return;
    }
    try {
      await this.svc.desactivarPropiedad(this.propiedadId);
      this.desactivarSuccess = 'Propiedad desactivada correctamente.';
      // opcional: redirigir a mis-propiedades
      setTimeout(() => this.router.navigate(['/mis-propiedades']), 1000);
    } catch (e: any) {
      this.desactivarError = e.response?.data?.error || 'Error al desactivar.';
    }
  }
}
