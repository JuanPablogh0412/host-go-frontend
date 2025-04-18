import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { ArrendadorCreateComponent } from './components/arrendador/create/create.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'crear-arrendador', component: ArrendadorCreateComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
