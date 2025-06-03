import { Injectable } from '@angular/core';
import axios from 'axios';
import { Pago, NuevoPago } from '../models/pago.model';
import { AppSettings } from '../app-settings';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private baseUrl = `${AppSettings.baseUrl}/Pago`;

  async obtenerPagos(): Promise<Pago[]> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get<Pago[]>(this.baseUrl, { headers });
    return res.data;
  }

  async crearPago(p: NuevoPago): Promise<Pago> {
    const token = localStorage.getItem('jwt');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.post<Pago>(
      this.baseUrl,
      p,
      { headers }
    );
    return res.data;
  }
}
