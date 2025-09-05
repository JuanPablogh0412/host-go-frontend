import { Injectable } from '@angular/core';
import axios from 'axios';
import { Foto } from '../models/foto.model';
import { AppSettings } from '../app-settings';


@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private base = `${AppSettings.baseUrl}/Foto`;

  async subirFoto(propiedadId: number, archivo: File): Promise<Foto> {
    const token = localStorage.getItem('jwt');
    const form = new FormData();
    form.append('archivo', archivo);

    const res = await axios.post<Foto>(
      `${this.base}/propiedad/${propiedadId}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  }
}