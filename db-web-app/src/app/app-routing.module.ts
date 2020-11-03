import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EintragErstellenComponent } from './eintragErstellen/eintragErstellen.component';
import { MainComponent } from './main/main.component'; 
import { LoginComponent } from './login/login.component'; 
import { RegistrierungComponent } from './registrierung/registrierung.component'; 
import { EintragBearbeitenComponent } from "./eintragBearbeiten/eintragBearbeiten.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main/:WorkspaceID', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registrierung', component: RegistrierungComponent},
  { path: 'eintragBearbeiten/:EintragID', component: EintragBearbeitenComponent},
  { path: 'eintragBearbeiten/Tagebuch/:EintragID', component: EintragBearbeitenComponent},
  { path: 'eintragBearbeiten/ToDo/:EintragID', component: EintragBearbeitenComponent},
  { path: 'eintragBearbeiten/Kalender/:EintragID', component: EintragBearbeitenComponent},
  { path: 'eintragBearbeiten/Ziel/:EintragID', component: EintragBearbeitenComponent},
  { path: 'eintragBearbeiten/Erinnerung/:EintragID', component: EintragBearbeitenComponent},
  { path: 'eintragErstellen/:WorkspaceID', component: EintragErstellenComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
