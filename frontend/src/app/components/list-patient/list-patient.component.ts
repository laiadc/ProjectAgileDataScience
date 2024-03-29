import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Patient, PatientJson, GenderType, EyeColorType } from '../../Models/patients';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {

  patients: PatientJson[];
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }
  
  subscription1: Subscription;

  ngOnInit() {
    const user = this.afAuth.auth.currentUser;
    this.subscription1 = this.afs.collection('patients', (ref) => ref.where('ownerId', '==', user.uid))
      .valueChanges().subscribe((res=> {
        const inter:any = res;
        this.patients = inter;
      }));
    
  }
  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
  }

}
