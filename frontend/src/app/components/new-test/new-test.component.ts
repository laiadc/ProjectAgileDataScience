import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Test, AbsentPresentType, ScenarioType, CutaneousBiopsyHistologiclaSubtypeType, 
  VisceralMetastasisLocationType, PrimaryTumourLocationCodedType, CutaneousBiopsyPredominantCellType, TestJson, ParcialExtensiveType } from 'src/app/Models/test';
import { Patient, PatientJson, GenderType, EyeColorType, HairColorType, PatientPhototype } from '../../Models/patients';

import uuid from 'uuid/v4';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {

  test: Test;
  patientId: string;
  patient: Patient;

  absentPresent: {name: string; value: AbsentPresentType}[] =[
    {name: 'Absent', value: AbsentPresentType.absent},
    {name: 'Present', value: AbsentPresentType.present}
  ];
  extensiveParcial: {name: string; value: ParcialExtensiveType}[] =[
    {name: 'Absent', value: ParcialExtensiveType.absent},
    {name: 'Partial', value: ParcialExtensiveType.partial},
    {name: 'Extensive', value: ParcialExtensiveType.extensive}
  ];

  scenarios: {name: string; value: ScenarioType}[] =[
    {name: 'Scenario1', value: ScenarioType.scenario1},
    {name: 'Scenario2', value: ScenarioType.scenario2},
    {name: 'Scenario3', value: ScenarioType.scenario3},
    {name: 'Scenario4', value: ScenarioType.scenario4}
  ];

  cutaneousBiopsyHistologicals: {name: string; value: CutaneousBiopsyHistologiclaSubtypeType}[] =[
    {name: 'Acral Lentiginous', value: CutaneousBiopsyHistologiclaSubtypeType.acral_lentiginous},
    {name: 'Desmoplastic', value: CutaneousBiopsyHistologiclaSubtypeType.desmoplastic},
    {name: 'Lentiginous Malignant', value: CutaneousBiopsyHistologiclaSubtypeType.lentiginous_malignant},
    {name: 'Mocosal', value: CutaneousBiopsyHistologiclaSubtypeType.mocosal},
    {name: 'Nevoid', value: CutaneousBiopsyHistologiclaSubtypeType.nevoid},
    {name: 'Nodular', value: CutaneousBiopsyHistologiclaSubtypeType.nodular},
    {name: 'Spitzoid', value: CutaneousBiopsyHistologiclaSubtypeType.spitzoid},
    {name: 'Superficial Spreading', value: CutaneousBiopsyHistologiclaSubtypeType.superficial_spreading},
    {name: 'Other', value: CutaneousBiopsyHistologiclaSubtypeType.other}
  ];

  visceralMetastasisLocation: {name: string; value: VisceralMetastasisLocationType}[] =[
    {name: 'Bone', value: VisceralMetastasisLocationType.bone},
    {name: 'Cns', value: VisceralMetastasisLocationType.cns},
    {name: 'Hepatic', value: VisceralMetastasisLocationType.hepatic},
    {name: 'Multiple', value: VisceralMetastasisLocationType.multiple},
    {name: 'Pulmonary', value: VisceralMetastasisLocationType.pulmonary}
  ];

  primaryTumourLocationCoded: {name: string; value: PrimaryTumourLocationCodedType}[] =[
    {name: 'Acral', value: PrimaryTumourLocationCodedType.acral},
    {name: 'Head and Neck', value: PrimaryTumourLocationCodedType.head_and_neck},
    {name: 'Lower Limbs', value: PrimaryTumourLocationCodedType.lower_limbs},
    {name: 'Mucosa', value: PrimaryTumourLocationCodedType.mucosa},
    {name: 'Trunk', value: PrimaryTumourLocationCodedType.trunk},
    {name: 'Upper Limbs', value: PrimaryTumourLocationCodedType.upper_limbs},
    {name: 'Other', value: PrimaryTumourLocationCodedType.other}
  ];

  cutaneousBiopsyPredominantCellType: {name: string; value: CutaneousBiopsyPredominantCellType}[] =[
    {name: 'Epitheloid', value: CutaneousBiopsyPredominantCellType.epitheloid},
    {name: 'Fusocellular', value: CutaneousBiopsyPredominantCellType.fusocellular},
    {name: 'Plemorphic', value: CutaneousBiopsyPredominantCellType.plemorphic},
    {name: 'Sarcomathoid', value: CutaneousBiopsyPredominantCellType.sarcomathoid},
    {name: 'Small cell', value: CutaneousBiopsyPredominantCellType.small_cell},
    {name: 'Other', value: CutaneousBiopsyPredominantCellType.other}
  ];

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.test = new Test();
    this.route.paramMap.subscribe((params)=> {
      this.patientId = params.get('patientId');
      if(!this.patientId) this.router.navigate(['/']);
      const rest = this.afs.doc<PatientJson>('patients/'+this.patientId)
      .valueChanges().subscribe(res => {
        if (!res) this.router.navigate(['/']);
        this.patient = Patient.fromJson(res);
        const timeDiff = Math.abs(Date.now() - this.patient.birthDate.getTime());
        this.test.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
        this.test.patient_eye_color = this.patient.eyeColor;
        this.test.patient_hair_color = this.patient.hairColor;
        this.test.patient_gender = this.patient.gender;
        this.test.patientId = this.patientId;
      });
    });
  }

  ngOnInit() {
  }

  create() {
    this.test.id  = uuid();

    const usersCollections = this.afs.collection<TestJson>('tests');
    usersCollections.doc(this.test.id)
      .set(this.test.toJson());
      this.router.navigate(['/patient', this.patientId]);
    
  }

}
