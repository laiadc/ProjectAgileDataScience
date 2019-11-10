import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthService } from './services/auth.service';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent} from './components/signin/signin.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { PatientComponent } from './components/patient/patient.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'patients', component: ListPatientComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
