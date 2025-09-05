import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../../models/solicitud.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.css']
})
export class SolicitudCardComponent {
  @Input() solicitud!: Solicitud;

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
}
