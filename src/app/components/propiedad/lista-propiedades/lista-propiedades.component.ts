import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
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

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.propiedadService.obtenerPropiedades().then((res) => {
      this.propiedades = res;
    });
  }
}
