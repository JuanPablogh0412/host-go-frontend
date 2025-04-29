import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FotoService } from '../../../services/foto.service';

@Component({
  selector: 'app-foto-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './foto-upload.component.html',
  styleUrls: ['./foto-upload.component.css']
})
export class FotoUploadComponent implements OnInit {
  propiedadId!: number;
  archivos: File[] = [];
  mensajes: string[] = [];
  subiendo = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fotoSvc: FotoService
  ) {}

  ngOnInit() {
    this.propiedadId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.propiedadId) {
      // Si no viene Id, redirigir al listado
      this.router.navigate(['/lista-propiedades']);
    }
  }

  onFilesSelected(event: Event) {
    const inp = event.target as HTMLInputElement;
    if (inp.files) {
      this.archivos = Array.from(inp.files);
      this.mensajes = [];
    }
  }

  async onUpload() {
    if (!this.archivos.length) {
      this.mensajes = ['Selecciona al menos una imagen.'];
      return;
    }
    this.subiendo = true;
    this.mensajes = [];
    for (const file of this.archivos) {
      try {
        await this.fotoSvc.subirFoto(this.propiedadId, file);
        this.mensajes.push(`✅ "${file.name}" subido correctamente.`);
      } catch (e: any) {
        console.error(e);
        this.mensajes.push(`❌ Error al subir "${file.name}".`);
      }
    }
    this.subiendo = false;
  }

  onFinish() {
    this.router.navigate(['/mis-propiedades']);
  }

isDragging = false;
progress = 0;

onDragOver(event: DragEvent) {
  event.preventDefault();
  this.isDragging = true;
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  this.isDragging = false;
}

onDrop(event: DragEvent) {
  event.preventDefault();
  this.isDragging = false;
  if (event.dataTransfer?.files) {
    this.archivos = Array.from(event.dataTransfer.files);
  }
}

getPreview(file: File): string {
  return URL.createObjectURL(file);
}

formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

removeFile(index: number) {
  this.archivos.splice(index, 1);
}
}
