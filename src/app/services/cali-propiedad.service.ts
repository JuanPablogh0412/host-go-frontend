import { Injectable } from '@angular/core';
import axios from 'axios';
import { AppSettings } from '../app-settings';
import { CaliPropiedad } from '../models/caliPropiedad.model';

export interface NuevaCalificacion {
  estrellas: number;
  comentario: string;
  propiedad: { propiedadId: number };
}

@Injectable({ providedIn: 'root' })
export class CaliPropiedadService {
  private baseUrl = `${AppSettings.baseUrl}/CaliPropiedad`;

  async crearCalificacion(data: NuevaCalificacion): Promise<CaliPropiedad> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.post<CaliPropiedad>(
      this.baseUrl,
      data,
      { headers }
    );
    return res.data;
  }

  async obtenerCalificaciones(): Promise<CaliPropiedad[]> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get<CaliPropiedad[]>(this.baseUrl, { headers });
    return res.data;
  }
}
