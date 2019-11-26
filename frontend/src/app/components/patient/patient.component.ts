import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Patient, PatientJson, GenderType, EyeColorType, HairColorType, PatientPhototype } from '../../Models/patients';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patientId: string;
  patient: Patient;

  eyeColors  = {
    [EyeColorType.blue]:'Blue',
    [EyeColorType.black]:'Black',
    [EyeColorType.brown]:'Brown',
    [EyeColorType.green]:'Green',
    [EyeColorType.other]:'Other',
  };

  hairColors = {
    [HairColorType.blond]:'Blond',
    [HairColorType.black]:'Black',
    [HairColorType.brown]:'Brown',
    [HairColorType.red]:'Red',
    [HairColorType.other]:'Other',
  };
  
  patientPhototypes = {
    [PatientPhototype.I]:'I',
    [PatientPhototype.II]:'II',
    [PatientPhototype.III]:'III',
    [PatientPhototype.IV]:'IV'
  };
  age: number
  daiagnoseDate: string;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
    ) { 
    this.route.paramMap.subscribe((params)=> {
      this.patientId = params.get('patientId');
      if(!this.patientId) this.router.navigate(['/']);
      const res = this.afs.doc<PatientJson>('patients/'+this.patientId)
      .valueChanges().subscribe(res => {
        this.patient = Patient.fromJson(res);
        const timeDiff = Math.abs(Date.now() - this.patient.birthDate.getTime());
        this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      
        const d = this.patient.daiagnoseDate;
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        this.daiagnoseDate = [year, month, day].join('-');
      });
    });
  }

  ngOnInit() {
  }

}
