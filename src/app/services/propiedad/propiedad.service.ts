import { Injectable } from '@angular/core';
import axios from 'axios';
import { PropiedadResumen } from '../../models/propiedad/propiedad-resumen.model';
import { PropiedadDto } from '../../models/propiedad/propiedad-dto.model.js';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
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
  }
}
