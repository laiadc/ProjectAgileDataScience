import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { AngularFireModule  } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BodyComponent } from './components/body/body.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { PatientComponent } from './components/patient/patient.component';
import { TestComponent } from './components/test/test.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
import { NewTestComponent } from './components/new-test/new-test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    SignUpComponent,
    BodyComponent,
    FootbarComponent,
    ListPatientComponent,
    PatientComponent,
    TestComponent,
    NewPatientComponent,
    NewTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
