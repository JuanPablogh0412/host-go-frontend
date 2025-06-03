// src/app/services/calificacion.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { AppSettings } from '../app-settings';
import { Calificacion } from '../models/calificacion.model';

@Injectable({ providedIn: 'root' })
export class CalificacionService {
  private baseUrl = `${AppSettings.baseUrl}/Calificacion`;

  /**
   * Envía una nueva calificación al backend. 
   * Se espera que el objeto Calificacion que pasemos tenga:
   *   - estrellas (número entre 1 y 5)
   *   - comentario (string)
   *   - cuenta: { cuentaId: number }
   * El backend ignorará calificacionId y status (se asignan en el servidor).
   */
  async crearCalificacion(c: Calificacion): Promise<Calificacion> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.post<Calificacion>(this.baseUrl, c, { headers });
    return res.data;
  }

  /** (Opcional) obtener todas las calificaciones */
  async obtenerCalificaciones(): Promise<Calificacion[]> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get<Calificacion[]>(this.baseUrl, { headers });
    return res.data;
  }

  /** (Opcional) obtener una calificación por ID */
  async obtenerCalificacion(id: number): Promise<Calificacion> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get<Calificacion>(`${this.baseUrl}/${id}`, { headers });
    return res.data;
  }

  /** (Opcional) actualizar una calificación existente */
  async actualizarCalificacion(c: Calificacion): Promise<Calificacion> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.put<Calificacion>(this.baseUrl, c, { headers });
    return res.data;
  }

  /** (Opcional) eliminar una calificación */
  async eliminarCalificacion(id: number): Promise<void> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
