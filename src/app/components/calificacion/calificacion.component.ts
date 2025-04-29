import { Component, Input, OnInit } from '@angular/core';
import { calificacionDto, CalificacionService } from '../../services/calificacion.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-calificacion',
  imports: [CommonModule],
  templateUrl: './calificacion.component.html',
  styleUrl: './calificacion.component.css'
})
export class CalificacionComponent implements OnInit {
  comentarios: calificacionDto[] = []
  @Input() usuario!:string;

  constructor(private CalificacionService:CalificacionService){}

  ngOnInit(): void {
    if(this.usuario){
      this.CalificacionService.getComentarios(this.usuario)
        .subscribe({
          next: (data) =>{
            this.comentarios = data;
          },
          error: (err) =>{
            console.error("Error obteniendo comentarios", err);
          }
        })
    }
  }

  
}
