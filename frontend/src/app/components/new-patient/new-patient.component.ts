import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Router, RouterStateSnapshot,} from '@angular/router';

import { Patient, PatientJson, GenderType, EyeColorType, HairColorType, PatientPhototype } from '../../Models/patients';

import uuid from 'uuid/v4';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  id: string;
  name: string = '';
  surname: string = '';
  gender: string = GenderType.female;
  birthDate: string = (new Date()).toISOString();
  daiagnoseDate: string = (new Date()).toISOString();
  eyeColor: string = EyeColorType.blue;
  hairColor: string = HairColorType.black;
  patientPhototype: number = PatientPhototype.I;

  genders: {name: string; value: GenderType}[] =[
    {name: 'Male', value: GenderType.male},
    {name: 'Female', value: GenderType.female}
  ]

  eyeColors: {name: string; value: EyeColorType}[] =[
    {name: 'Blue', value: EyeColorType.blue},
    {name: 'Black', value: EyeColorType.black},
    {name: 'Brown', value: EyeColorType.brown},
    {name: 'Green', value: EyeColorType.green},
    {name: 'Other', value: EyeColorType.other}
  ]
  hairColors: {name: string; value: HairColorType}[] =[
    {name: 'Black', value: HairColorType.black},
    {name: 'Brown', value: HairColorType.brown},
    {name: 'Blond', value: HairColorType.blond},
    {name: 'Red', value: HairColorType.red},
    {name: 'Other', value: HairColorType.other}
  ]
  patientPhototypes: {name: string; value: PatientPhototype}[] =[
    {name: 'I', value: PatientPhototype.I},
    {name: 'II', value: PatientPhototype.II},
    {name: 'III', value: PatientPhototype.III},
    {name: 'IV', value: PatientPhototype.IV}
  ]

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
  }

  ngOnInit() {

  }

  create() {

    console.log(this.birthDate, this.daiagnoseDate, GenderType[this.gender]);

    const newPatient = new Patient();
    newPatient.name = this.name;
    newPatient.surname = this.surname;
    newPatient.gender = GenderType[this.gender];
    newPatient.birthDate = new Date(this.birthDate);
    newPatient.eyeColor = EyeColorType[this.eyeColor];
    newPatient.hairColor = HairColorType[this.hairColor];
    newPatient.patientPhototype = this.patientPhototype;
    newPatient.daiagnoseDate = new Date(this.daiagnoseDate);
    newPatient.id  = uuid();

    const user = this.afAuth.auth.currentUser;
    newPatient.ownerId = user.uid;

    const usersCollections = this.afs.collection<PatientJson>('patients');
    usersCollections.doc(newPatient.id)
      .set(newPatient.toJson());
      this.router.navigate(['/patients']);
  }

}
