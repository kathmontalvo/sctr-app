import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { ActivatedRoute } from "@angular/router";
import { InsuranceService } from "../../services/insurance.service";
import { AuthService } from "../../services/auth.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.page.html",
  styleUrls: ["./insurance.page.scss"]
})
export class InsurancePage implements OnInit {
  segment: string;
  sctrType: object;
  users: object[];
  companies: object[];
  insuranceId: number;
  insuranceInfo: object;
  qrcodename: string;
  title = "generate-qrcode";
  elementType: "url" | "canvas" | "img" = "url";
  value: string;
  display = true;
  pdfFile: string;
  fileUrl;
  protectedUrl: SafeUrl;
  user;
  loading: any;

  constructor(
    public popOverCtrl: PopoverController,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.showLoading();
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.insuranceId = id;
    console.log(this.insuranceId, typeof id);

    this.getInsuranceData(this.insuranceId);
    this.user = this.authService.getObject("user");
    this.segment = "details";
    this.generateQRCode();
  }

  openRegister(ev, key) {
    this.showLoading();
    this.getRegister(this.insuranceId).subscribe(async response => {
      const companies = response["data"];
      const popover = await this.popOverCtrl.create({
        component: PopoverComponent,
        componentProps: { register: companies[key], id: this.insuranceId, loading: this.loading, key: key},
        event: ev,
        cssClass: "popover-style",
        translucent: true
      });
      return await popover.present();
    }, error => {
      this.loading.dismiss();
      this.presentAlert('Error', 'Ocurrió un error al obtener la información. Intentelo nuevamente.', 'Aceptar');
    });
  }

  getInsuranceData(insuranceId) {
    this.insuranceService.getUserInsurance(insuranceId).subscribe(
      async response => {
        console.log(response);
        this.loading.dismiss();

        this.authService.setObject("insurance", response["data"]);
        this.insuranceInfo = response["data"];
        this.qrcodename = this.insuranceInfo["code"];
        this.users = this.insuranceInfo["insu_users"];
        this.sctrType = this.insuranceInfo["type"];
        this.getRegister(insuranceId).subscribe(response => {
          this.companies = response["data"];
          console.log(this.companies);
        }, error => {
          this.loading.dismiss();
          this.presentAlert('Error', 'Ocurrió un error al obtener la información. Intentelo nuevamente.', 'Aceptar');
        });
        this.protectedUrl = await this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://docs.google.com/viewer?url=${this.insuranceInfo["document"]}&embedded=true`
        );
      },
      error => {
        this.loading.dismiss();
        this.presentAlert('Error', 'Ocurrió un error al obtener la información. Intentelo nuevamente.', 'Aceptar');
      }
    );
  }

  generateQRCode() {
    this.value = this.qrcodename;
    this.display = true;
  }
  getRegister(id) {
    return this.insuranceService.getInsuranceRegister(id);
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
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: ""
    });

    this.loading.present();
  }
  
}
