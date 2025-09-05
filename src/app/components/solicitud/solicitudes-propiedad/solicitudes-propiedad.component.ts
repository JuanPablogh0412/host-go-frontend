// src/app/components/solicitud/solicitudes-propiedad/solicitudes-propiedad.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../services/solicitud.service';
import { Solicitud } from '../../../models/solicitud.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolicitudPropiedadCardComponent } from '../solicitud-propiedad-card/solicitud-propiedad-card.component';

@Component({
  selector: 'app-solicitudes-propiedad',
  standalone: true,
  imports: [CommonModule, RouterModule, SolicitudPropiedadCardComponent],
  templateUrl: './solicitudes-propiedad.component.html',
  styleUrls: ['./solicitudes-propiedad.component.css']
})
export class SolicitudesPropiedadComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  cargando = true;
  error = '';

  constructor(
    private svc: SolicitudService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    try {
      this.solicitudes = await this.svc.obtenerPorPropiedad(id);
    } catch {
      this.error = 'No tienes permiso para ver esta propiedad o no existe.';
    } finally {
      this.cargando = false;
    }
  }
}
