import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalificarUsuarioComponent } from './components/calificar-usuario/calificar-usuario.component';
import { CalificarPropiedadComponent } from "./components/calificar-propiedad/calificar-propiedad.component";
import { CaliPropiedadComponent } from './components/cali-propiedad/cali-propiedad.component';
import { CalificacionComponent } from "./components/calificacion/calificacion.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CalificarUsuarioComponent,
    CalificarPropiedadComponent,
    CaliPropiedadComponent,
    CalificacionComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lospipol2';
  mostrarComentarios1:boolean = false;
  mostrarComentarios2:boolean = false;
  toggleComentarios1(){
    this.mostrarComentarios1 = !this.mostrarComentarios1;
  }
  toggleComentarios2(){
    this.mostrarComentarios2 = !this.mostrarComentarios2;
  }
}
