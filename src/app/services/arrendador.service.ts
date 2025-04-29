import { Injectable } from '@angular/core';
import axios from 'axios';
import { Arrendador } from '../models/arrendador.model';
import { ArrendadorCreate } from '../models/arrendador-create.model';

@Injectable({
  providedIn: 'root'
})
export class ArrendadorService {

  private baseUrl = 'http://10.43.103.121/Arrendador';

  constructor() { }

  async createArrendador(arrendadorData: ArrendadorCreate): Promise<Arrendador | null> {
    try {
      const response = await axios.post<Arrendador>(this.baseUrl, arrendadorData);
      return response.data;
    } catch (error) {
      console.error('Error al crear arrendador:', error);
      return null;
    }
  }
}
