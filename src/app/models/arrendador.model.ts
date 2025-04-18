import { Cuenta } from './cuenta.model';
import { Status } from './status.enum';
export interface Arrendador {
  arrendadorId: number;
  cedula: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;
  status: Status;
  cuenta?: Cuenta;
}
