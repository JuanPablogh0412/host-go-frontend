import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../../models/solicitud.model';
import { RouterModule, Router } from '@angular/router';
import { PagoService } from '../../../services/pago.service';
import { Pago } from '../../../models/pago.model';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.css']
})
export class SolicitudCardComponent implements OnInit {
  @Input() solicitud!: Solicitud;

  hasPago = false;
  pago?: Pago;

  constructor(
    private pagoSvc: PagoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pagoSvc.obtenerPagos()
      .then(pagos => {
        const encontrado = pagos.find(p => p.solicitud.solicitudId === this.solicitud.solicitudId);
        if (encontrado) {
          this.hasPago = true;
          this.pago = encontrado;
        }
      })
      .catch(() => {
        this.hasPago = false;
      });
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'INACTIVE': 'En espera',
      'ACTIVE': 'Aceptado',
      'DELETED': 'Rechazado'
    };
    return statusMap[status] || status;
  }

  isArrendatario(): boolean {
    const raw = localStorage.getItem('user');
    if (!raw) return false;
    const u = JSON.parse(raw);
    return !!u.arrendatarioId;
  }

  irAPagar() {
    this.router.navigate(['/solicitud', this.solicitud.solicitudId, 'pagar']);
  }

  irACalificar() {
    const propiedadId = this.solicitud.propiedad.propiedadId;
    this.router.navigate(['/propiedad', propiedadId, 'calificar']);
  }
}
