import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../../models/solicitud.model';
import { SolicitudService } from '../../../services/solicitud.service';
import { PagoService } from '../../../services/pago.service';
import { Pago } from '../../../models/pago.model';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-propiedad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-propiedad-card.component.html',
  styleUrls: ['./solicitud-propiedad-card.component.css']
})
export class SolicitudPropiedadCardComponent implements OnInit {
  @Input() solicitud!: Solicitud;

  hasPago = false;
  pago?: Pago;

  constructor(
    private svc: SolicitudService,
    private pagoSvc: PagoService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const todosLosPagos = await this.pagoSvc.obtenerPagos();
      const encontrado = todosLosPagos.find(p => p.solicitud.solicitudId === this.solicitud.solicitudId);
      if (encontrado) {
        this.hasPago = true;
        this.pago = encontrado;
      }
    } catch {
      this.hasPago = false;
    }
  }

  async responder(accion: 'aceptar' | 'cancelar') {
    try {
      const updated = accion === 'aceptar'
        ? await this.svc.aceptar(this.solicitud.solicitudId)
        : await this.svc.cancelar(this.solicitud.solicitudId);
      this.solicitud = updated;
    } catch {
      alert('Error al procesar la solicitud');
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'INACTIVE': 'En espera',
      'ACTIVE':   'Aceptada',
      'DELETED':  'Rechazada'
    };
    return statusMap[status] || status;
  }

  irACalificarArrendatario() {
    const arrendatarioId = this.solicitud.arrendatario.arrendatarioId;
    this.router.navigate(['/arrendatario', arrendatarioId, 'calificar']);
  }
}
