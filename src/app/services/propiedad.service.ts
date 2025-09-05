// src/app/services/propiedad.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Propiedad } from '../models/propiedad.model';
import { AppSettings } from '../app-settings';


@Injectable({ providedIn: 'root' })
export class PropiedadService {
  private baseUrl = `${AppSettings.baseUrl}/Propiedad`;
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

  async actualizarPropiedad(data: Propiedad): Promise<Propiedad> {
    const res = await axios.put<Propiedad>(
      `${this.baseUrl}`, 
      data,
      { headers: this.authHeader() }
    );
    return res.data;
  }

  private authHeader() {
    const token = localStorage.getItem('jwt');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async desactivarPropiedad(id: number): Promise<Propiedad> {
    const token = localStorage.getItem('jwt');
    const res = await axios.put<Propiedad>(
      `${this.baseUrl}/${id}/desactivar`,
      null,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return res.data;
  }

  async buscarPropiedades(
    nombre: string,
    ubicacion: string,
    capacidad: number
  ): Promise<Propiedad[]> {
    const params: Record<string, any> = {};
    if (nombre) params['nombre'] = nombre;
    if (ubicacion) params['ubicacion'] = ubicacion;
    if (capacidad > 0) params['capacidad'] = capacidad;
    const res = await axios.get<Propiedad[]>(`${this.baseUrl}/buscar`, { params });
    return res.data;
  }
}
