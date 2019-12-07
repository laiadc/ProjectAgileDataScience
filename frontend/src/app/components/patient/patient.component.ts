import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Patient, PatientJson, GenderType, EyeColorType, HairColorType, PatientPhototype } from '../../Models/patients';
import { TestJson, Test } from 'src/app/Models/test';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patientId: string;
  patient: Patient;
  tests: Test;

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
      const rest = this.afs.doc<PatientJson>('patients/'+this.patientId)
      .valueChanges().subscribe(res => {
        this.patient = Patient.fromJson(res);
        const timeDiff = Math.abs(Date.now() - this.patient.birthDate.getTime());
        this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

        this.daiagnoseDate = this.formatDate( this.patient.daiagnoseDate);
        this.afs.collection('tests', (ref) => ref.where('patientId', '==', this.patientId))
      .valueChanges().subscribe((res=> {
        const inter:any  = res;
        
        this.tests=inter.map((inData: TestJson) => {return Test.fromJson(inData);});
        console.log("test", this.tests);
      }));

      });
    });
  }

  formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  ngOnInit() {
  }

}
