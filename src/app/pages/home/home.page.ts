import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InsuranceService } from '../../services/insurance.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('barCanvas', { static: false }) barCanvas: any;

  segment: string;
  user: object;
  insuranceTypes: Array<Object>;
  sharedInsuranceTypes: Array<Object>;
  show = true;

  private barChart: Chart;

  constructor(private authService: AuthService, private insuranceService: InsuranceService) {}

  ngOnInit() {
    this.segment = 'insure';
    this.getInsuranceData();
  }

  ngAfterViewInit() {
    this.createBarChart();
    console.log(this.insuranceTypes);
  }

  createBarChart() {
    console.log(this.barCanvas);
    if (this.barCanvas) {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', ''],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
              borderColor: ['rgba(255,99,132,1)', 'rgba(255,99,132,1)', 'rgba(255,99,132,1)', 'rgba(255,99,132,1)', 'rgba(255,99,132,1)', 'rgba(255,99,132,1)'],
              borderWidth: 1
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }
  getInsuranceData() {
    this.insuranceService.getInsurances().subscribe(res => {
      this.insuranceTypes = res['data'];
      this.sharedInsuranceTypes = this.insuranceTypes;
      this.user = this.insuranceTypes[0]['user'];
      this.authService.setObject('user', this.user);
      console.log(this.user);
    });
  }
}
