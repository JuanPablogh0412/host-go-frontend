// src/app/services/cali-propiedad.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { CaliPropiedad } from '../models/caliPropiedad.model';
import { AppSettings } from '../app-settings';

@Injectable({ providedIn: 'root' })
export class CaliPropiedadService {
  private baseUrl = `${AppSettings.baseUrl}/CaliPropiedad`;

  async crearCalificacion(data: Omit<CaliPropiedad, 'caliPropiedadId'|'status'>): Promise<CaliPropiedad> {
    const res = await axios.post<CaliPropiedad>(this.baseUrl, data);
    return res.data;
  }
}
