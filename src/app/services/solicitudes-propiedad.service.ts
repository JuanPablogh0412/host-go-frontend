// src/app/services/solicitud-propiedad.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Solicitud } from '../models/solicitud.model';

@Injectable({ providedIn: 'root' })
export class SolicitudPropiedadService {
  private baseUrl = 'http://10.43.103.121/Solicitud/propiedad';

  async obtenerPorPropiedad(propiedadId: number): Promise<Solicitud[]> {
    const token = localStorage.getItem('jwt')!;
    const user = JSON.parse(localStorage.getItem('user')!);
    const arrendadorId = user.arrendadorId;
    const res = await axios.get<Solicitud[]>(
      `${this.baseUrl}/${propiedadId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { arrendadorId }
      }
    );
    return res.data;
  }

  async aceptarSolicitud(solicitudId: number): Promise<Solicitud> {
    const token = localStorage.getItem('jwt')!;
    const res = await axios.put<Solicitud>(
      `http://10.43.103.121/Solicitud/aceptar/${solicitudId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }

  async cancelarSolicitud(solicitudId: number): Promise<Solicitud> {
    const token = localStorage.getItem('jwt')!;
    const res = await axios.put<Solicitud>(
      `http://10.43.103.121/Solicitud/cancelar/${solicitudId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
}
