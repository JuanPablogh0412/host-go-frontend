<<<<<<< HEAD
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PropiedadResumen } from '../../models/propiedad/propiedad-resumen.model';
import { PropiedadDto } from '../../models/propiedad/propiedad-dto.model.js';
=======
// src/app/services/propiedad.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Propiedad } from '../../models/propiedad.model';

>>>>>>> 7302099 (funciona ng serve)

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
<<<<<<< HEAD
  private api = axios.create({
    baseURL: 'http://localhost:8080/Propiedad',
    headers: { 'Content-Type': 'application/json' }
  });

  /** Listar todas las propiedades completas */
  async obtenerPropiedades(): Promise<PropiedadDto[]> {
    const res = await this.api.get<PropiedadDto[]>('/');
    return res.data;
  }

  /** Obtener detalle completo de una propiedad */
  async obtenerPorId(id: number): Promise<PropiedadDto> {
    const res = await this.api.get<PropiedadDto>(`/${id}`);
    return res.data;
  }

  /** Crear nueva propiedad */
  async crearPropiedad(payload: Partial<PropiedadDto>): Promise<PropiedadDto> {
    const res = await this.api.post<PropiedadDto>('/', payload);
    return res.data;
  }

  /** Actualizar propiedad existente */
  async actualizarPropiedad(payload: PropiedadDto): Promise<PropiedadDto> {
    const res = await this.api.put<PropiedadDto>(`/${payload.propiedadId}`, payload);
    return res.data;
  }

  /** Eliminar (hard delete) una propiedad */
  async eliminarPropiedad(id: number): Promise<void> {
    await this.api.delete(`/${id}`);
  }

  /** Buscar propiedades con filtros opcionales */
  async buscarPropiedades(filters: {
    nombre?: string;
    municipio?: string;
    capacidad?: number;
  }): Promise<PropiedadDto[]> {
    const res = await this.api.get<PropiedadDto[]>('/buscar', { params: filters });
    return res.data;
  }

  /** Desactivar (soft‐delete) una propiedad */
  async desactivarPropiedad(id: number): Promise<PropiedadDto> {
    const res = await this.api.put<PropiedadDto>(`/desactivar/${id}`);
    return res.data;
  }

  /** Listar resúmenes de propiedades para un arrendador */
  async obtenerResumenesPorArrendador(arrendadorId: number): Promise<PropiedadResumen[]> {
    const res = await this.api.get<PropiedadResumen[]>(`/arrendador/${arrendadorId}`);
    return res.data;
  }

  /** Subir varias fotos a una propiedad */
  async uploadPropertyPhotos(id: number, files: File[]): Promise<void> {
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    await this.api.post(`/fotos/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
=======
  private baseUrl = 'http://localhost:8080/Propiedad';

  /** Obtiene todas las propiedades */
  async obtenerPropiedades(): Promise<Propiedad[]> {
    try {
      const res: AxiosResponse<Propiedad[]> = await axios.get(this.baseUrl);
      return res.data;
    } catch (err) {
      console.error('Error al obtener propiedades', err);
      return [];
    }
  }

  /** Obtiene una propiedad por su ID */
  async obtenerPorId(id: number): Promise<Propiedad | null> {
    try {
      const res: AxiosResponse<Propiedad> = await axios.get(`${this.baseUrl}/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Error al obtener propiedad ${id}`, err);
      return null;
    }
  }

  /** Crea una nueva propiedad */
  async crearPropiedad(payload: Partial<Propiedad>): Promise<Propiedad | null> {
    try {
      const res: AxiosResponse<Propiedad> = await axios.post(this.baseUrl, payload);
      return res.data;
    } catch (err) {
      console.error('Error al crear propiedad', err);
      return null;
    }
  }

  /** Actualiza una propiedad existente */
  async actualizarPropiedad(payload: Propiedad): Promise<Propiedad | null> {
    try {
      const res: AxiosResponse<Propiedad> = await axios.put(
        `${this.baseUrl}/${payload.propiedadId}`,
        payload
      );
      return res.data;
    } catch (err) {
      console.error('Error al actualizar propiedad', err);
      return null;
    }
  }

  /** Elimina una propiedad */
  async eliminarPropiedad(id: number): Promise<boolean> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
      return true;
    } catch (err) {
      console.error(`Error al eliminar propiedad ${id}`, err);
      return false;
    }
  }

  /**
   * Busca propiedades por filtros
   * nombre y municipio como cadenas, capacidad como número mínimo
   */
  async buscarPropiedades(
    nombre: string,
    municipio: string,
    capacidad: number
  ): Promise<Propiedad[]> {
    try {
      const res: AxiosResponse<Propiedad[]> = await axios.get(
        `${this.baseUrl}/buscar`,
        { params: { nombre, municipio, capacidad } }
      );
      return res.data;
    } catch (err) {
      console.error('Error al buscar propiedades', err);
      return [];
    }
  }

  /** Desactiva (soft‐delete) una propiedad */
  async desactivarPropiedad(id: number): Promise<Propiedad | null> {
    try {
      const res: AxiosResponse<Propiedad> = await axios.put(
        `${this.baseUrl}/desactivar/${id}`
      );
      return res.data;
    } catch (err) {
      console.error(`Error al desactivar propiedad ${id}`, err);
      return null;
    }
  }

  /** Obtiene un resumen de propiedades de un arrendador */
  async obtenerPorArrendador(arrendadorId: number): Promise<Propiedad[]> {
    try {
      const res: AxiosResponse<Propiedad[]> = await axios.get(
        `${this.baseUrl}/arrendador/${arrendadorId}`
      );
      return res.data;
    } catch (err) {
      console.error(`Error al obtener propiedades de arrendador ${arrendadorId}`, err);
      return [];
    }
>>>>>>> 7302099 (funciona ng serve)
  }
}
