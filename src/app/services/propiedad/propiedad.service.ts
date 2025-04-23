// src/app/services/propiedad.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Propiedad } from '../../models/propiedad.model';


@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
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
  }
}
