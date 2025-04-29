// src/app/services/propiedad.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Propiedad } from '../models/propiedad.model';

@Injectable({ providedIn: 'root' })
export class PropiedadService {
  private baseUrl = 'http://10.43.103.121/Propiedad';
  private daneUrl = 'https://www.datos.gov.co/resource/xdk5-pm3f.json';

  /** Trae todas las propiedades */
  async obtenerPropiedades(): Promise<Propiedad[]> {
    try {
      const res = await axios.get<Propiedad[]>(this.baseUrl);
      return res.data;
    } catch {
      return [];
    }
  }

  async crearPropiedad(data: Propiedad): Promise<Propiedad> {
    const res = await axios.post<Propiedad>(this.baseUrl, data);
    return res.data;
  }

  async obtenerUbicaciones(): Promise<{ departamento: string; municipio: string }[]> {
    const res = await axios.get<{ departamento: string; municipio: string }[]>(this.daneUrl);
    return res.data;
  }

  async obtenerPropiedad(id: number): Promise<Propiedad> {
    const res = await axios.get<Propiedad>(`${this.baseUrl}/${id}`);
    return res.data;
  }
}
