import { Component, Input } from '@angular/core';
import { PropiedadResumen } from '../../../models/propiedad-resumen.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mi-propiedad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mi-propiedad-card.component.html',
  styleUrl: './mi-propiedad-card.component.css'
})
export class MiPropiedadCardComponent {
  @Input() propiedad!: PropiedadResumen;
}
