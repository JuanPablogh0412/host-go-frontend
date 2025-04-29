// src/app/components/solicitud/mis-solicitudes/mis-solicitudes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud.service';
import { Solicitud } from '../../../models/solicitud.model';
import { SolicitudCardComponent } from '../solicitud-card/solicitud-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, SolicitudCardComponent, RouterModule],
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  cargando = true;
  error = '';

  constructor(private svc: SolicitudService) {}

  async ngOnInit() {
    try {
      this.solicitudes = await this.svc.obtenerMisSolicitudes();
    } catch {
      this.error = 'No pudimos cargar tus solicitudes.';
    } finally {
      this.cargando = false;
    }
  }
}
