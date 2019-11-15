import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  tests = ['test1', 'test2', 'test3'];
  constructor() { }

  ngOnInit() {
  }

}
