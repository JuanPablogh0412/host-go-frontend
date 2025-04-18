import { Status } from './status.enum';

export interface Cuenta {
    cuentaId: number;
    usuario: string;
    contrasena: string;
    tipo: string; // Valores posibles: "ARRENDADOR", "ARRENDATARIO", "ADMIN"
    status: Status; // Por ejemplo: "ACTIVE", "INACTIVE", "DELETED"
  }
  