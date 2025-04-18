import { Propiedad } from './propiedad.model';
import { Status } from './status.enum';

export interface CaliPropiedad {
  caliPropiedadId: number;
  estrellas: number;
  comentario: string;
  status: Status;
  propiedad: Propiedad;
}
