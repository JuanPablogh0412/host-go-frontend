export class CalificacionPropiedad {
    estrellas!: number;
    comentario!: string;
    nombrePropiedad!: string;
    ubicacion!: string;
//solo para componenetes de Victor Sanchez, adaptar al repositorio y borrar luego
    constructor(init?: Partial<CalificacionPropiedad>){
        Object.assign(this, init)
    }
}
