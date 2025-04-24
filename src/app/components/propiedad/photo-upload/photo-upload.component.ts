import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropiedadService } from '../../../services/propiedad/propiedad.service';

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  files: File[] = [];
  propertyId!: number;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService
  ) {}

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.files = input.files ? Array.from(input.files) : [];
  }

  async onUpload(): Promise<void> {
    if (!this.files.length) return;
    try {
      await this.propiedadService.uploadPropertyPhotos(this.propertyId, this.files);
      this.successMessage = 'Fotos subidas exitosamente.';
      this.files = [];
    } catch {
      this.errorMessage = 'Error al subir fotos.';
    }
  }
}
