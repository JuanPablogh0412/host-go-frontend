import { Status } from './status.enum';
import { Cuenta } from './cuenta.model';

export interface Calificacion {
    calificacionId: number;
    estrellas: number;
    comentario: string;
    status: Status;
    cuenta: Cuenta;
  }
  