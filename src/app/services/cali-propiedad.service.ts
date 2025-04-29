import axios from 'axios'
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs';

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
  private Apiurl='http://localhost:8081/CaliPropiedad/porPropiedad';

  constructor(){}

  getComentarios(nombrePropiedad:string,ubicacion:string): Observable<caliPropiedadDto[]>{
    const params = {
      nombrePropiedad:nombrePropiedad,
      ubicacion:ubicacion
    };
    return from(axios.get<caliPropiedadDto[]>(`${this.Apiurl}`,{params}))
    .pipe(map(response =>response.data));
  }
}
