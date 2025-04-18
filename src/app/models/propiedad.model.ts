import { Arrendador } from './arrendador.model';
import { Status } from './status.enum';

export interface Propiedad {
  propiedadId: number;
  nombre: string;
  departamento: string;
  municipio: string;
  tipoIngreso: string; // Por ejemplo: "Carretera principal", "Secundaria", "Terciaria"
  descripcion: string;
  capacidad: number;
  habitaciones: number;
  banos: number;
  permiteMascotas: boolean;
  tienePiscina: boolean;
  tieneAsador: boolean;
  valorNoche: number;
  status: Status;
  arrendador: Arrendador;
}
