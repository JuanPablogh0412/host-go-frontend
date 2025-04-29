import axios from 'axios'
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

export interface PropiedadDto{
  propiedad_Id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precio: number;
  tipo: string;
  capacidad: number;
  estado: number;
}

export interface caliPropiedadDto{
  caliPropiedad_id: number;
  estrellas: number;
  comentario: string;
  status: string;
  propiedad: PropiedadDto;
}

@Injectable({
  providedIn: 'root'
})
export class CaliPropiedadService {
  private Apiurl='http://localhost:8081/CaliPropiedad';

  constructor(){}

  getComentarios(nombrePropiedad:string,ubicacion:string): Observable<caliPropiedadDto[]>{
    const url = `${this.Apiurl}/porPropiedad?nombrePropiedad=${encodeURIComponent(nombrePropiedad)}&ubicacion=${encodeURIComponent(ubicacion)}`;
    return from(axios.get<caliPropiedadDto[]>(url).then(response => response.data));
  }
}
