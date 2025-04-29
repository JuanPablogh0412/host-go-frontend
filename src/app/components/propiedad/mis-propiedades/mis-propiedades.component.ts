import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisPropiedadesService } from '../../../services/mis-propiedades.service';
import { PropiedadResumen } from '../../../models/propiedad-resumen.model';
import { RouterModule } from '@angular/router';
import { MiPropiedadCardComponent } from '../mi-propiedad-card/mi-propiedad-card.component';

@Component({
  selector: 'app-mis-propiedades',
  standalone: true,
  imports: [CommonModule, MiPropiedadCardComponent, RouterModule],
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.css']
})
export class MisPropiedadesComponent implements OnInit {
  propiedades: PropiedadResumen[] = [];
  cargando = true;
  error = '';

  constructor(private svc: MisPropiedadesService) {}

  async ngOnInit() {
    try {
      this.propiedades = await this.svc.obtenerMisPropiedades();
    } catch (e) {
      this.error = 'No pudimos cargar tus propiedades. Intenta de nuevo más tarde.';
    } finally {
      this.cargando = false;
    }
  }
}
