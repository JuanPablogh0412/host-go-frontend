import { Propiedad } from './propiedad.model';

export interface Foto {
  fotoId: number;
  url: string;
  status: string;
  propiedad: Propiedad;
}
