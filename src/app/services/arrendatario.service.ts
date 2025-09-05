import { Injectable } from '@angular/core';
import axios from 'axios';
import { Arrendatario } from '../models/arrendatario.model';
import { ArrendatarioCreate } from '../models/arrendatario-create.model';
import { AppSettings } from '../app-settings';


@Injectable({
  providedIn: 'root'
})
export class ArrendatarioService {

  private baseUrl = `${AppSettings.baseUrl}/Arrendatario`;

  constructor() { }

  async createArrendatario(arrendatarioData: ArrendatarioCreate): Promise<Arrendatario | null> {
    try {
      const response = await axios.post<Arrendatario>(this.baseUrl, arrendatarioData);
      return response.data;
    } catch (error) {
      console.error('Error al crear arrendatario:', error);
      return null;
    }
  }
}
