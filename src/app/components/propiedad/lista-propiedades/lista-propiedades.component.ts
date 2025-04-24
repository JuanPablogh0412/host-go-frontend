import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../services/propiedad/propiedad.service';
import { Propiedad } from '../../../models/propiedad/propiedad.model';
import { PropiedadCardComponent } from '../propiedad-card/propiedad-card.component';

@Component({
  selector: 'app-lista-propiedades',
  standalone: true,
  imports: [CommonModule, PropiedadCardComponent],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponent implements OnInit {
  propiedades: Propiedad[] = [];
  loading = true;
  errorMessage = '';

  constructor(private propiedadService: PropiedadService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.propiedades = await this.propiedadService.obtenerPropiedades();
    } catch {
      this.errorMessage = 'No se pudieron cargar las propiedades.';
    } finally {
      this.loading = false;
    }
  }
}
