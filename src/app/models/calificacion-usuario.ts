export class CalificacionUsuario {
    estrellas!: number;
    comentario!: string;
    nombreUsuario!: string;
    //solo para componenetes de Victor Sanchez, adaptar al repositorio y borrar luego

    constructor(init?: Partial<CalificacionUsuario>){
        Object.assign(this, init)
    }
}
