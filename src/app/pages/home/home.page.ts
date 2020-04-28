import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserService } from "src/app/services/user.service";
import { InsuranceService } from "../../services/insurance.service";
import { Chart } from "chart.js";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";

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
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.showLoading();
    this.router.navigateByUrl("/home");
    this.segment = "insure";
    this.getInsuranceData();
    this.getGraphicData();
  }
  ionViewWillEnter() {
    this.user = this.authService.getObject("user");
  }

  getGraphicData() {
    this.insuranceService.getGraphic().subscribe(res => {
      this.graphicData = res["data"]; // Data -> Mes: #días
      console.log(this.graphicData);

      if (this.graphicData["type"] == 0) {
        this.graphicLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
      } else {
        this.graphicLabels = ["Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
      }
      this.createBarChart();
    }, err => {
      this.presentAlert(
        "Error",
        "Hubo un error al obtener la información del gráfico.",
        "Continuar"
      );
    });
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
    this.insuranceService.getInsurances().subscribe(res => {
      this.loading.dismiss();

      this.insuranceTypes = res["data"];
      this.user = this.authService.getObject("user");
    }, err => {
      this.loading.dismiss();
      this.presentAlert(
        "Error",
        "Hubo un error al obtener la información.",
        "Aceptar"
      );
      this.router.navigate(["/login"]);
    });
  }

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
  navigateToInsurance(id) {
    this.router.navigate(["/insurance", id]);
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: ""
    });

    this.loading.present();
  }
  async presentAlert(title, message, btn) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: btn,
        },
      ],
    });
    await alert.present();
  };
}
