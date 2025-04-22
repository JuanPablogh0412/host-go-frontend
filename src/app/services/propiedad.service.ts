import { Injectable } from '@angular/core';
import axios from 'axios';
import { Propiedad } from '../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private baseUrl = 'http://localhost:8080/Propiedad';

  async obtenerPropiedades(): Promise<Propiedad[]> {
    try {
      const res = await axios.get<Propiedad[]>(this.baseUrl);
      return res.data;
    } catch (err) {
      console.error('Error al obtener propiedades', err);
      return [];
    }
  }
}
