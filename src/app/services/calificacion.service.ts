import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs';

export interface cuentaDto{
  cuenta_id:number;
  usuario:string;
  contrasena:string;
}

export interface calificacionDto{
  calificacion_id:number;
  estrellas:number;
  comentario:string;
  cuenta:cuentaDto;
}

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private Apiurl='http://localhost:8081/Calificacion/porUsuario';

  constructor() {}

  getComentarios(usuario:string): Observable<calificacionDto[]>{
    const params = {
      usuario:usuario
    };
    return from (axios.get<calificacionDto[]>(`${this.Apiurl}`,{params}))
    .pipe(map(response => response.data))

  }
}
