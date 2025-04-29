// src/app/services/mis-propiedades.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PropiedadResumen } from '../models/propiedad-resumen.model';

interface BackendResumen {
  propiedadId: number;
  nombre: string;
  departamento: string;
  municipio: string;
  valorNoche: number;
  fotos: { url: string }[];
}

@Injectable({
  providedIn: 'root'     // <-- esto lo registra globalmente
})
export class MisPropiedadesService {
  private baseUrl = 'http://10.43.103.121/Propiedad/misPropiedades';

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
