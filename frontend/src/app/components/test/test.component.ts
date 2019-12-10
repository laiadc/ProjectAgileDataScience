import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { TestJson, Test } from 'src/app/Models/test';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public processing: boolean = true;

  public lineChartData: ChartDataSets[] = [
    { data: [1.0000,1.0000,0.9836,0.9748,0.9669,0.9251,0.8889,0.8712,0.8438,0.8158,0.8087,0.8029,0.7837,0.7727,0.7448,0.7403,0.7355,0.7039,0.6975,0.6854,0.6710,0.6682,0.6635,0.6528,0.6525,0.6375,0.6330,0.6282,0.6229,0.6190,0.6170,0.6139,0.6139,0.6134,0.6112,0.5970,0.5771,0.5702,0.5623,0.5593,0.5564,0.5518,0.5481,0.5422,0.5371,0.5352,0.5295,0.5132,0.5095,0.5036,0.4993,0.4951,0.4946,0.4940,0.4935,0.4930,0.4930,0.4907,0.4884,0.4819,0.4819,0.4803,0.4753,0.4753,0.4740,0.4740,0.4726,0.4726,0.4726,0.4726,0.4715,0.4688,0.4617,0.4506,0.4506,0.4506,0.4499,0.4499,0.4499,0.4460,0.4460,0.4460,0.4460,0.4460,0.4393,0.4323,0.4282,0.4282,0.4282,0.4282,0.4282,0.4282,0.4282,0.4282,0.4252,0.4252,0.4252,0.4252,0.4252,0.4252,0.4252,0.4252,0.4252,0.4083,0.4083,0.4083,0.4083,0.4083,0.4083,0.4083,0.4083,0.3925,0.3925,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3813,0.3792,0.3792,0.3792,0.3792,0.3792,0.3792,0.3792,0.3792,0.3792,0.3792,0.3782,0.3782,0.3782,0.3782,0.3782,0.3782,0.3767,0.3767,0.3767,0.3767,0.3767,0.3767,0.3767,0.3767,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3755,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.3741,0.374], label: 'Test 001' }
  ];

  public lineChartLabels: Label[] = [1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,  13, 14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,  64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79,  80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,  91,  92,  93,  94,  95,  96,  97,  98,  99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254].map((r)=>r+'');

  public lineChartOptions: (ChartOptions) = {
    responsive: false,
    scales: {
      xAxes: [{id: 'x-axis-0', position: 'bottom',}],
      yAxes: [{id: 'y-axis-0', position: 'left',}]
    }
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(139,209,255,1)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: 'rgba(148,159,177,0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  testId: string;
  test:Test;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
    ) { 
    this.route.paramMap.subscribe((params)=> {
      this.testId = params.get('testId');
      console.log(this.testId);
      if(!this.testId) this.router.navigate(['/']);
      const rest = this.afs.doc<TestJson>('tests/'+this.testId)
      .valueChanges().subscribe(res => {
        
        console.log(res);
        this.test = Test.fromJson(res);
        console.log(this.test);
        this.http.get("http://35.205.222.156:5000/test/"+this.test.id).subscribe((data) => {});
        this.processing = !this.test.isProcessed;
        if(!this.processing){
          this.lineChartData[0]['data'] = this.test.predictedCurvePoints;
          this.lineChartLabels = Array.from(Array(this.test.predictedCurvePoints.length).keys()).map((r)=>(r+1)+'')
        };
      });
    });
  }

  ngOnInit() {
    setTimeout(()=>{
      if(!this.test.isProcessed)
      this.http.get("http://35.205.222.156:5000/test/"+this.test.id).subscribe((data) => {});
    }, 1000);

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

}
