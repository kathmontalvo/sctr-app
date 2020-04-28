import { Component, OnInit } from "@angular/core";
import { PopoverController, NavParams } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { InsuranceService } from "src/app/services/insurance.service";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent implements OnInit {
  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavParams,
    private authService: AuthService,
    private insuranceService: InsuranceService,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {}
  visits: object[];
  fromHour;
  toHour;
  bodyNow;
  today;
  d = new Date();
  dateNow = ("0" + this.d.getDate()).slice(-2);
  month = ("0" + (this.d.getMonth() + 1)).slice(-2); // Since getMonth() returns month from 0-11 not 1-12
  year = this.d.getFullYear();
  dateStr = this.dateNow + "/" + this.month + "/" + this.year;
  hours;
  minutes;
  seconds;
  fullDate;
  loading: any;
  register: any;
  registerBtn;
  commentText: string = "";
  disableBtn: boolean = false;

  ngOnInit() {
    this.register = this.navCtrl.get('register')
    this.visits = this.navCtrl.get('register')["visits"].reverse();
    this.today = this.visits[0];
    this.registerBtn = this.today.from.date !== this.dateStr ? 'entrada' : 'salida';
    if (this.registerBtn === 'salida' && this.today.to.date === this.dateStr) {
      this.registerBtn = 'entrada';
      this.disableBtn = true
    }
    console.log(this.dateStr, this.visits)
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }

  onRegister() {
    this.d = new Date();
    this.dateNow = ("0" + this.d.getDate()).slice(-2);
    this.month = ("0" + (this.d.getMonth() + 1)).slice(-2); // Since getMonth() returns month from 0-11 not 1-12
    this.year = this.d.getFullYear();
    this.hours =  ("0" + this.d.getHours()).slice(-2);
    this.minutes = ("0" + this.d.getMinutes()).slice(-2);
    this.seconds = ("0" + this.d.getSeconds()).slice(-2);
  
    this.fullDate = this.year + "-" + this.month + "-" + this.dateNow + " " +  this.hours + ":" + this.minutes + ":" + this.seconds;
    
    console.log(this.fullDate)
    console.log(this.dateStr)
    
    const insurence_id = this.authService.getObject("insurance").id;
    const plant_id= this.register.id;
    const body= this.commentText;
    const date = this.fullDate;

    console.log(insurence_id, plant_id, body, date)

    this.insuranceService.postRegister(insurence_id, plant_id, body, date, date).subscribe(
      response => {
        this.presentAlert('¡Excelente!', 'Se ha registrado correctamente a los colaboradores.', 'Aceptar');
        this.onClick;
      },
      error => {
        this.presentAlert(
          "Error",
          "Hubo un error al realizar esta acción. Intente nuevamente.",
          "Aceptar"
        );
      }
    )
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
