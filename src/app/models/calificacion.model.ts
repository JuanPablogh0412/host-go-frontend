import { Status } from './status.enum';

export interface Calificacion {
    calificacionId: number;
    estrellas: number;
    comentario: string;
    status: Status;
    // Se puede incluir la cuenta si es necesario:
    cuenta: any; // O bien crear un modelo específico para Cuenta si quieres tipar exactamente
  }
  