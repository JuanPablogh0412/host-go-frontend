import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalificacionUsuario } from '../../models/calificacion-usuario';
import axios from 'axios';

@Component({
  standalone: true,
  selector: 'app-calificar-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './calificar-usuario.component.html',
  styleUrl: './calificar-usuario.component.css'
})
export class CalificarUsuarioComponent {
  @Input() nombreUsuario!:string;

  calificacion: CalificacionUsuario = new CalificacionUsuario({
    estrellas: 0,
    comentario: '',
    nombreUsuario: ''
  });

  estrellasDisponibles = [1,2,3,4,5];

  async enviarCalificacion(){
    this.calificacion.nombreUsuario = this.nombreUsuario;

    try{
      const response = await axios.post('http://localhost:8081/Calificacion/calificar', null,{
        params:{
          estrellas:this.calificacion.estrellas,
          comentario:this.calificacion.comentario,
          nombreUsuario:this.nombreUsuario
        }
      });
      console.log("Calificacion enviada correctamente",response.data);
    } catch (error){
      console.log("Error al enviar calificacion", error);
    }
  }
}
