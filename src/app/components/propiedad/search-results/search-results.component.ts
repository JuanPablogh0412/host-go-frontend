import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PropiedadService } from '../../../services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { PropiedadCardComponent } from '../propiedad-card/propiedad-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PropiedadCardComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  propiedades: Propiedad[] = [];
  cargando = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private svc: PropiedadService
  ) {}

  async ngOnInit() {
    const { nombre, ubicacion, capacidad } = this.route.snapshot.queryParams;
    const cap = Number(capacidad) || 0;

    try {
      this.propiedades = await this.svc.buscarPropiedades(
        nombre ?? '',
        ubicacion ?? '',
        cap
      );
    } catch {
      this.error = 'Error al buscar propiedades.';
    } finally {
      this.cargando = false;
    }
  }
}
