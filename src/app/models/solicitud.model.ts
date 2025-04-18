import { Propiedad } from './propiedad.model';
import { Arrendatario } from './arrendatario.model';
import { Status } from './status.enum';

export interface Solicitud {
  solicitudId: number;
  fechaInicio: string; // Podrías usar Date si prefieres, pero en JSON usualmente es string
  fechaFin: string;
  cantidadPer: number;
  costoTotal: number;
  status: Status;
  propiedad: Propiedad;
  arrendatario: Arrendatario;
}
