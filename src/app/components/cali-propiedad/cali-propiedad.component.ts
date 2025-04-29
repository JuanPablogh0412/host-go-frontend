import { Component, Input, OnInit} from '@angular/core';
import { caliPropiedadDto, CaliPropiedadService } from '../../services/cali-propiedad.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  selector: 'app-cali-propiedad',
  imports: [CommonModule],
  templateUrl: './cali-propiedad.component.html',
  styleUrl: './cali-propiedad.component.css'
})
export class CaliPropiedadComponent implements OnInit{
  comentarios: caliPropiedadDto[] = [];
  @Input() nombrePropiedad!:string;
  @Input() Ubicacion!:string;

  constructor(private CaliPropiedadService : CaliPropiedadService){}

  ngOnInit(): void {
    if(this.nombrePropiedad&&this.Ubicacion){
      this.CaliPropiedadService.getComentarios(this.nombrePropiedad, this.Ubicacion)
        .subscribe({
          next: (data) =>{
            this.comentarios = data;
          },
          error: (err) => {
            console.error('Error obteniendo comentarios', err);
          }
        })
    }
  }
}
