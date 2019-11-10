import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {

  patients = ['Patient 1', 'Patient2', 'Patient3'];
  constructor() { }

  ngOnInit() {
  }

}
