import { Component, Input } from '@angular/core';
import { Solicitud } from '../../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-propiedad-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-propiedad-card.component.html',
  styleUrls: ['./solicitud-propiedad-card.component.css']
})
export class SolicitudPropiedadCardComponent {
  @Input() solicitud!: Solicitud;

  constructor(private svc: SolicitudService) {}

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
}
