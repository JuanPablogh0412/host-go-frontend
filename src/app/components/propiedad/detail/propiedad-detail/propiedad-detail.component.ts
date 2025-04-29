// src/app/components/propiedad/detail/propiedad-detail.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PropiedadService } from '../../../../services/propiedad.service';
import { SolicitudService } from '../../../../services/solicitud.service';
import { AuthService }       from '../../../../services/auth/login.service';
import { Propiedad }         from '../../../../models/propiedad.model';
import { Solicitud }         from '../../../../models/solicitud.model';

@Component({
  selector: 'app-propiedad-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './propiedad-detail.component.html',
  styleUrls: ['./propiedad-detail.component.css']
})
export class PropiedadDetailComponent implements OnInit, OnDestroy {
  activeSlideIndex = 0;
  slideInterval: any;

  propiedad: Propiedad | null = null;
  cargando = true;
  error = '';

  userRole: 'ARRENDADOR' | 'ARRENDATARIO' | null = null;
  private sub!: Subscription;

  reservaForm: FormGroup;
  reservaError = '';
  reservaSuccess = '';

  constructor(
    private route: ActivatedRoute,
    private svc: PropiedadService,
    private solicitudSvc: SolicitudService,
    private auth: AuthService,
    fb: FormBuilder,
    private router: Router
  ) {
    this.reservaForm = fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin:    ['', Validators.required],
      cantidadPer: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // Escuchamos cambios de login para actualizar rol
    this.sub = this.auth.authState$.subscribe(loggedIn => {
      if (loggedIn) {
        const raw = localStorage.getItem('user');
        if (raw) {
          const u = JSON.parse(raw);
          this.userRole = u.arrendadorId != null ? 'ARRENDADOR' : 'ARRENDATARIO';
        }
      } else {
        this.userRole = null;
      }
    });

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadPropiedad(id);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    clearInterval(this.slideInterval);
  }

  private async loadPropiedad(id: number) {
    try {
      const dto = await this.svc.obtenerPropiedad(id);
      if (!dto?.propiedadId) {
        this.error = 'Propiedad no encontrada.';
      } else {
        this.propiedad = dto;
        // Iniciar carrusel cada 5s
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
      }
    } catch {
      this.error = 'No se pudo cargar la propiedad.';
    } finally {
      this.cargando = false;
    }
  }

  prevSlide() {
    if (!this.propiedad) return;
    const len = this.propiedad.fotos?.length || 1;
    this.activeSlideIndex = (this.activeSlideIndex + len - 1) % len;
  }

  nextSlide() {
    if (!this.propiedad) return;
    const len = this.propiedad.fotos?.length || 1;
    this.activeSlideIndex = (this.activeSlideIndex + 1) % len;
  }

  goToSlide(index: number) {
    this.activeSlideIndex = index;
  }

  isInvalid(name: string): boolean {
    const c = this.reservaForm.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  async submitReserva() {
    if (this.reservaForm.invalid || this.userRole !== 'ARRENDATARIO' || !this.propiedad) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    const arr = JSON.parse(localStorage.getItem('user') || '{}');
    const req: Omit<Solicitud,'solicitudId'|'costoTotal'|'status'> = {
      fechaInicio: this.reservaForm.value.fechaInicio,
      fechaFin:    this.reservaForm.value.fechaFin,
      cantidadPer: this.reservaForm.value.cantidadPer,
      propiedad:   { propiedadId: this.propiedad.propiedadId } as any,
      arrendatario:{ arrendatarioId: arr.arrendatarioId } as any
    };

    try {
      const created = await this.solicitudSvc.crearSolicitud(req);
      this.reservaSuccess = `Solicitud enviada! Costo: $${created.costoTotal}`;
      this.reservaError = '';
      this.reservaForm.reset({ cantidadPer: 1 });
    } catch (e: any) {
      this.reservaError = e.response?.data?.error || 'Error al enviar solicitud';
      this.reservaSuccess = '';
    }
  }

  editar() {
    if (this.propiedad) {
      this.router.navigate([`/propiedad/${this.propiedad.propiedadId}/editar`]);
    }
  }

  verSolicitudes() {
    if (this.propiedad) {
      this.router.navigate([`/propiedad/${this.propiedad.propiedadId}/solicitudes`]);
    }
  }
}
