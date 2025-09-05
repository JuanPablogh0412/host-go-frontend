import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../../../models/propiedad.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-propiedad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './propiedad-card.component.html',
  styleUrls: ['./propiedad-card.component.css']
})
export class PropiedadCardComponent {
  @Input() propiedad!: Propiedad;
}
