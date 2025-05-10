<<<<<<< HEAD
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../services/propiedad/propiedad.service';

@Component({
  selector: 'app-deactivate-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deactivate-modal.component.html',
  styleUrls: ['./deactivate-modal.component.css']
})
export class DeactivateModalComponent {
  @Input() propertyId!: number;
  @Output() closed = new EventEmitter<boolean>();
  errorMessage = '';
  processing = false;

  constructor(private propiedadService: PropiedadService) {}

  async confirm(): Promise<void> {
    if (this.processing) return;
    this.processing = true;
    try {
      await this.propiedadService.desactivarPropiedad(this.propertyId);
      this.closed.emit(true);
    } catch {
      this.errorMessage = 'No se pudo desactivar.';
    } finally {
      this.processing = false;
    }
  }

  cancel(): void {
    this.closed.emit(false);
  }
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-deactivate-modal',
  imports: [],
  templateUrl: './deactivate-modal.component.html',
  styleUrl: './deactivate-modal.component.css'
})
export class DeactivateModalComponent {

>>>>>>> 7302099 (funciona ng serve)
}
