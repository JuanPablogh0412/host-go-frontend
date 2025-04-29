import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;  // Declaramos pero no inicializamos aquí
  ubicaciones: { departamento: string; municipio: string }[] = [];
  departamentos: string[] = [];
  municipios: string[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: PropiedadService,
    private router: Router
  ) {
    // Aquí inicializamos el form
    this.searchForm = this.fb.group({
      nombre: [''],
      departamento: [''],
      municipio: [''],
      capacidad: [1, Validators.min(1)]
    });
  }

  async ngOnInit() {
    try {
      this.ubicaciones = await this.svc.obtenerUbicaciones();
      this.departamentos = Array.from(
        new Set(this.ubicaciones.map(u => u.departamento))
      ).sort();
    } catch {
      console.error('No se pudieron cargar ubicaciones');
    }
  }

  onDeptoChange() {
    const dep = this.searchForm.value.departamento;
    this.municipios = this.ubicaciones
      .filter(u => u.departamento === dep)
      .map(u => u.municipio)
      .sort();
    this.searchForm.patchValue({ municipio: '' });
  }

  onSubmit() {
    if (this.searchForm.invalid) return;
    const { nombre, departamento, municipio, capacidad } = this.searchForm.value;
    const ubicacionParam = municipio || departamento || '';
    this.router.navigate(['/buscar'], {
      queryParams: { nombre, ubicacion: ubicacionParam, capacidad }
    });
  }
}
