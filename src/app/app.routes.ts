import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { ArrendadorCreateComponent } from './components/arrendador/create/create.component';
import { ListaPropiedadesComponent } from './components/propiedad/lista-propiedades/lista-propiedades.component';
import { CrearCuentaComponent } from './shared/crear-cuenta/crear-cuenta.component';
import { ArrendatarioCreateComponent } from './components/arrendatario/create/create.component';
import { ActivarCuentaComponent } from './shared/activar-cuenta/activar-cuenta.component';
import { LoginComponent } from './components/auth/login/login.component';   

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'crear-cuenta', component: CrearCuentaComponent},
    { path: 'crear-arrendador', component: ArrendadorCreateComponent },
    { path: 'crear-arrendatario', component: ArrendatarioCreateComponent },
    { path: 'activar-cuenta', component: ActivarCuentaComponent },
    { path : 'login', component: LoginComponent },
    { path: 'lista-propiedades', component: ListaPropiedadesComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
