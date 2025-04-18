import { Bancos } from './bancos.enum';
import { Solicitud } from './solicitud.model';
import { Status } from './status.enum';

export interface Pago {
  pagoId: number;
  banco: Bancos;
  valor: number;
  numCuenta: number;
  status: Status;
  solicitud: Solicitud;
}
