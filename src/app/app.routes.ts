import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { ArrendadorCreateComponent } from './components/arrendador/create/create.component';
import { ListaPropiedadesComponent } from './components/propiedad/lista-propiedades/lista-propiedades.component';
import { CrearCuentaComponent } from './shared/crear-cuenta/crear-cuenta.component';
import { ArrendatarioCreateComponent } from './components/arrendatario/create/create.component';
import { ActivarCuentaComponent } from './shared/activar-cuenta/activar-cuenta.component';
import { LoginComponent } from './components/auth/login/login.component';   
import { PropiedadCreateComponent } from './components/propiedad/create/create.component';
import { FotoUploadComponent } from './components/propiedad/foto-upload/foto-upload.component';
import { MisPropiedadesComponent } from './components/propiedad/mis-propiedades/mis-propiedades.component';
import { PropiedadDetailComponent } from './components/propiedad/detail/propiedad-detail/propiedad-detail.component';
import { MisSolicitudesComponent } from './components/solicitud/mis-solicitudes/mis-solicitudes.component';
import { SolicitudesPropiedadComponent } from './components/solicitud/solicitudes-propiedad/solicitudes-propiedad.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'crear-arrendador', component: ArrendadorCreateComponent },
  { path: 'crear-arrendatario', component: ArrendatarioCreateComponent },
  { path: 'activar-cuenta', component: ActivarCuentaComponent },
  { path: 'login', component: LoginComponent },

  { path: 'crear-propiedad', component: PropiedadCreateComponent },
  { path: 'mis-propiedades', component: MisPropiedadesComponent },
  { path: 'lista-propiedades', component: ListaPropiedadesComponent },
  { path: 'mis-solicitudes', component: MisSolicitudesComponent },

  {
    path: 'propiedad/:id',
    component: PropiedadDetailComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'propiedad/:id/fotos',
    component: FotoUploadComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'propiedad/:id/solicitudes',
    component: SolicitudesPropiedadComponent,
    data: { renderMode: 'client' }
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];
