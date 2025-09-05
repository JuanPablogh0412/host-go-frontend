// src/app/services/mis-propiedades.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PropiedadResumen } from '../models/propiedad-resumen.model';
import { AppSettings } from '../app-settings';


interface BackendResumen {
  propiedadId: number;
  nombre: string;
  departamento: string;
  municipio: string;
  valorNoche: number;
  fotos: { url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class MisPropiedadesService {
  private baseUrl = `${AppSettings.baseUrl}/Propiedad/misPropiedades`;

  async obtenerMisPropiedades(): Promise<PropiedadResumen[]> {
    const token = localStorage.getItem('jwt');
    const res = await axios.get<BackendResumen[]>(this.baseUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.map(b => ({
      propiedadId: b.propiedadId,
      nombre: b.nombre,
      departamento: b.departamento,
      municipio: b.municipio,
      valorNoche: b.valorNoche,
      fotos: b.fotos.map(f => f.url)
    }));
  }
}
