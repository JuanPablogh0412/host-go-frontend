// src/app/models/propiedad/propiedad-dto.model.ts

import { Status } from '../status.enum';
import { Arrendatario } from '../arrendatario.model';

export interface PropiedadDto {
  propiedadId: number;
  nombre: string;
  departamento: string;
  municipio: string;
  tipoIngreso: string;    // "Carretera principal" | "Secundaria" | "Terciaria"
  descripcion: string;
  capacidad: number;
  habitaciones: number;
  banos: number;
  permiteMascotas: boolean;
  tienePiscina: boolean;
  tieneAsador: boolean;
  valorNoche: number;
  status: Status;         // Status.ACTIVE | Status.INACTIVE
  arrendador: Arrendatario;
  fotos?: string[];
}
