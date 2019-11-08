import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
  insureTypes: object[];
  sharedInsureTypes: object[];
  show = true;

  private barChart: Chart;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.segment = 'insure';

    this.user = this.authService.getObject('user').data;
    // this.user = {
    //   name: "Juan Perez",
    //   img:
    //     "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"
    // };
    this.insureTypes = [
      {
        title: 'SCTR Tipo 1',
        date: '13 de Julio, 2019',
        img: 'http://www.brandemia.org/wp-content/uploads/2011/10/pacifico_principal1.jpg'
      },
      {
        title: 'SCTR Tipo 2',
        date: '15 de Junio, 2019',
        img: 'https://scontent.flim16-2.fna.fbcdn.net/v/t1.0-9/40685546_2065496340129700_6359411715586654208_n.png?_nc_cat=1&_nc_oc=AQlU35x3IxyILe7SuH4UVqxxx9_p6C_8t3TjYfsG3h7G4QFqeqlr8a3yekvdd4Serm4&_nc_ht=scontent.flim16-2.fna&oh=4b3853be3545648a44598fcd27daac06&oe=5E2CF2E1'
      },
      {
        title: 'SCTR Tipo 3',
        date: '13 de Agosto, 2019',
        img: 'https://www.stex.edu.pe/wp-content/uploads/2019/04/seguro_mapfre.png'
      },
      {
        title: 'SCTR Tipo 4',
        date: '15 de Mayo, 2019',
        img: 'https://scontent.flim16-2.fna.fbcdn.net/v/t1.0-9/40685546_2065496340129700_6359411715586654208_n.png?_nc_cat=1&_nc_oc=AQlU35x3IxyILe7SuH4UVqxxx9_p6C_8t3TjYfsG3h7G4QFqeqlr8a3yekvdd4Serm4&_nc_ht=scontent.flim16-2.fna&oh=4b3853be3545648a44598fcd27daac06&oe=5E2CF2E1'
      }
    ];
    this.sharedInsureTypes = [
      {
        title: 'SCTR Tipo 5',
        date: '13 de Julio, 2019',
        img: 'http://www.brandemia.org/wp-content/uploads/2011/10/pacifico_principal1.jpg'
      },
      {
        title: 'SCTR Tipo 6',
        date: '15 de Junio, 2019',
        img: 'https://scontent.flim16-2.fna.fbcdn.net/v/t1.0-9/40685546_2065496340129700_6359411715586654208_n.png?_nc_cat=1&_nc_oc=AQlU35x3IxyILe7SuH4UVqxxx9_p6C_8t3TjYfsG3h7G4QFqeqlr8a3yekvdd4Serm4&_nc_ht=scontent.flim16-2.fna&oh=4b3853be3545648a44598fcd27daac06&oe=5E2CF2E1'
      },
      {
        title: 'SCTR Tipo 7',
        date: '13 de Agosto, 2019',
        img: 'https://www.stex.edu.pe/wp-content/uploads/2019/04/seguro_mapfre.png'
      },
      {
        title: 'SCTR Tipo 8',
        date: '15 de Mayo, 2019',
        img: 'https://scontent.flim16-2.fna.fbcdn.net/v/t1.0-9/40685546_2065496340129700_6359411715586654208_n.png?_nc_cat=1&_nc_oc=AQlU35x3IxyILe7SuH4UVqxxx9_p6C_8t3TjYfsG3h7G4QFqeqlr8a3yekvdd4Serm4&_nc_ht=scontent.flim16-2.fna&oh=4b3853be3545648a44598fcd27daac06&oe=5E2CF2E1'
      }
    ];
    // setTimeout(() => {
    // }, 500);
  }
  ngAfterViewInit() {
    this.createBarChart();
  }

  // segmentChanged(ev: any) {
  //   console.log("Segment changed", ev);
  // }
  createBarChart() {
    console.log(this.barCanvas);
    if (this.barCanvas) {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
              borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
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
}
