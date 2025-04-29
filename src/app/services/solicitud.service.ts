// src/app/services/solicitud.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Solicitud } from '../models/solicitud.model';
import { AuthService } from './auth/login.service';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private baseUrl = 'http://10.43.103.121/Solicitud';

  constructor(private auth: AuthService) {}

  async crearSolicitud(solicitud: Omit<Solicitud, 'solicitudId'|'costoTotal'|'status'>): Promise<Solicitud> {
    const token = localStorage.getItem('jwt');
    const res = await axios.post<Solicitud>(this.baseUrl, solicitud, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }

  async obtenerMisSolicitudes(): Promise<Solicitud[]> {
    const token = localStorage.getItem('jwt');
    const res = await axios.get<Solicitud[]>(`${this.baseUrl}/misSolicitudes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }

   async obtenerPorPropiedad(propiedadId: number): Promise<Solicitud[]> {
    const raw = localStorage.getItem('user')!;
    const arr = JSON.parse(raw);
    const arrId = arr.arrendadorId;
    const res = await axios.get<Solicitud[]>(
      `${this.baseUrl}/propiedad/${propiedadId}?arrendadorId=${arrId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
    );
    return res.data;
  }

  async aceptar(solicitudId: number): Promise<Solicitud> {
    const res = await axios.put<Solicitud>(`${this.baseUrl}/aceptar/${solicitudId}`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    });
    return res.data;
  }

  async cancelar(solicitudId: number): Promise<Solicitud> {
    const res = await axios.put<Solicitud>(`${this.baseUrl}/cancelar/${solicitudId}`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    });
    return res.data;
  }
}
