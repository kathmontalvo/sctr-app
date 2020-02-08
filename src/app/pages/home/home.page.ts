import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserService } from "src/app/services/user.service";
import { InsuranceService } from "../../services/insurance.service";
import { Chart } from "chart.js";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  @ViewChild("barCanvas", { static: false }) barCanvas: any;

  segment: string;
  user: object;
  insuranceTypes: Array<Object>;
  sharedInsuranceTypes: Array<Object>;
  show = true;
  loading: any;
  graphicData: object;
  graphicLabels: Array<string>;

  private barChart: Chart;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private insuranceService: InsuranceService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.router.navigateByUrl('/home')
    this.segment = "insure";
    this.getInsuranceData();
    this.getGraphicData();
  }

  ngAfterViewInit() {
    this.getGraphicData();
    console.log(this.insuranceTypes);
    this.getInsuranceData();

  }

  getGraphicData() {
    this.insuranceService.getGraphic().subscribe( res => {
      this.graphicData = res["data"] // Data -> Mes: #días
      console.log(this.graphicData);

      if(this.graphicData["type"] == 0){
        this.graphicLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
      } else {
        this.graphicLabels = ["Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
      }
      this.createBarChart();
    })
  }

  createBarChart() {
    console.log(this.barCanvas);
    if (this.barCanvas) {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.graphicLabels,
          datasets: [
            {
              label: "# visitas a planta",
              data: this.graphicData["data"],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)",
                "rgba(255,99,132,1)"
              ],
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
    // this.getUser();
    this.insuranceService.getInsurances().subscribe(res => {
      this.insuranceTypes = res["data"];
      this.sharedInsuranceTypes = this.insuranceTypes;
      this.user = this.authService.getObject("user").data;
      // this.getUser();
    });
  }
  // getUser() {
  //   this.userService.getUser().subscribe(res => {
  //     this.authService.setObject("user", res["data"]);
  //     this.user = this.authService.getObject("user");
  //     console.log(this.user);
  //   });
  // }
  handleInput($event) {
    const query = $event.target.value.toLowerCase();
    const items = Array.from(document.querySelector("ion-list").children);

    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item["style"].display = shouldShow ? "block" : "none";
      });
    });
  }
  async navigateToInsurance(id) {
    this.loading = await this.loadingController.create({
      message: ""
    });

    this.loading.present();
    this.router.navigate(["/insurance", id]);
    this.loading.dismiss();
  }
  // async showLoading() {
  //   this.loading = await this.loadingController.create({
  //     message: ""
  //   });

  //   this.loading.present();
  // }
}
