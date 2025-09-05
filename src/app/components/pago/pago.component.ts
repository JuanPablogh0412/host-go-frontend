// src/app/components/pago/pago.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Solicitud }   from '../../models/solicitud.model';
import { Bancos }       from '../../models/bancos.enum';
import { SolicitudService } from '../../services/solicitud.service';
import { PagoService }      from '../../services/pago.service';
import { NuevoPago }        from '../../models/pago.model';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  bancos = Object.values(Bancos);

  solicitud!: Solicitud;
  pagoForm: FormGroup;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private solicitudSvc: SolicitudService,
    private pagoSvc: PagoService,
    fb: FormBuilder,
    private router: Router
  ) {
    this.pagoForm = fb.group({
      banco:     ['', Validators.required],
      numCuenta: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    try {
      this.solicitud = await this.solicitudSvc.obtenerSolicitud(id);
      if (this.solicitud.status !== 'ACTIVE') {
        this.error = 'Solo solicitudes aceptadas pueden pagarse.';
      }
    } catch {
      this.error = 'No se encontró la solicitud.';
    }
  }

  isInvalid(name: string): boolean {
    const c = this.pagoForm.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  async submitPago() {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }
    this.error = this.success = '';
    const { banco, numCuenta } = this.pagoForm.value;
    const nuevoPago: NuevoPago = {
      banco,
      numCuenta,
      solicitud: { solicitudId: this.solicitud.solicitudId } as any
    };
    try {
      await this.pagoSvc.crearPago(nuevoPago);
      this.success = 'Pago registrado con éxito.';
      setTimeout(() => {
        const propiedadId = this.solicitud.propiedad.propiedadId;
        this.router.navigate(['/propiedad', propiedadId, 'calificar']);
      }, 1500);
    } catch (e: any) {
      this.error = e.response?.data?.error || 'Error al procesar el pago';
    }
  }

  
}
