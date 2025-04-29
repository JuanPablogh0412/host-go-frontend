import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

export interface cuentaDto{
  cuenta_id:number;
  usuario:string;
}

export interface calificacionDto{
  calificacion_id:number;
  comentario:string;
  estrellas:number;
}

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private Apiurl='http://localhost:8081/Calificacion';

  constructor() {}

  getComentarios(usuario:string): Observable<calificacionDto[]>{
    const url = `${this.Apiurl}/porUsuario?usuario=${encodeURIComponent(usuario)}`;
    return from(axios.get<calificacionDto[]>(url).then(response =>response.data));

  }
}
