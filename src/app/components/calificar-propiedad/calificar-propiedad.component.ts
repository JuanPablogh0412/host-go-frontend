import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalificacionPropiedad } from '../../models/calificacion-propiedad';
import axios from 'axios';


@Component({
  standalone:true,
  selector: 'app-calificar-propiedad',
  imports: [CommonModule, FormsModule],
  templateUrl: './calificar-propiedad.component.html',
  styleUrl: './calificar-propiedad.component.css'
})
export class CalificarPropiedadComponent {
  @Input() nombrePropiedad!:string;
  @Input() ubicacion!:string;

  calificacion: CalificacionPropiedad = new CalificacionPropiedad({
    estrellas: 0,
    comentario: '',
    nombrePropiedad: '',
    ubicacion: ''
  });
  estrellasDisponibles = [1,2,3,4,5];

  async enviarCalificacion(){
    this.calificacion.nombrePropiedad = this.nombrePropiedad;
    this.calificacion.ubicacion = this.ubicacion;

    try{
      const response = await axios.post('http://localhost:8081/CaliPropiedad/calificarProp', null,{
        params:{
          estrellas:this.calificacion.estrellas,
          comentario:this.calificacion.comentario,
          nombrePropiedad:this.calificacion.nombrePropiedad,
          ubicacion:this.calificacion.ubicacion
        }
      });
      console.log("Calificacion enviada correctamente",response.data);
    } catch (error){
      console.log("Error al enviar calificacion", error);
    }
  }

}
