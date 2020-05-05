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
    private insuranceService: InsuranceService,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {}
  visits: object[];
  visitId;
  inputCode;
  insuId;
  type;
  fromHour;
  toHour;
  bodyNow;
  today;
  registerKey;
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
    this.register = this.navCtrl.get('register');
    this.registerKey = this.navCtrl.get('key');
    this.loading = this.navCtrl.get('loading');
    this.loading.dismiss();
    this.insuId = this.register["id"];
    const visits = this.register["visits"];
    this.today = visits[0];
    this.initiating(visits, false);
    this.registerBtn = this.today.from.date !== this.dateStr ? 'entrada' : 'salida';
    this.type = this.today.from.date !== this.dateStr ? 0 : 1;
    if (this.registerBtn === 'salida' && this.today.to.date === this.dateStr) {
      this.registerBtn = 'entrada';
      this.type = 0;
      // this.disableBtn = true
    }

    console.log(this.dateStr, visits)
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
    
    const plant_id= this.register.id;
    const body= this.commentText || '-';
    const date = this.fullDate;
    const type = this.type;
    console.log(this.insuId, plant_id, body, date)

    this.insuranceService.postRegister(this.insuId, plant_id, body, date, date, type).subscribe(
      response => {
        this.presentAlert('¡Excelente!', 'Se ha registrado correctamente a los colaboradores.', 'Aceptar');
        this.onClick();
      },
      error => {
        this.presentAlert(
          "Error",
          "Hubo un error al realizar esta acción. Intente nuevamente.",
          "Aceptar"
        );
        this.onClick();
      }
    )
  }

  initiating(register, bool) {
    console.log(register)
    if (register.length !== 0) {
      // const visitas = register;
      this.visits = register.map((el) => {
        let editing = false;
        if (this.visitId == el["id"]) {
          editing = bool ? !editing : editing;
        }

        return {
          id: el["id"],
          body: el["body"],
          from: el["from"],
          to: el["to"],
          edit: editing,
        };
      });
      // console.log(register, this.visits);
    }
  }

  changeEdit(id, bool) {
    this.visitId = id;
    console.log(this.visitId);
    this.initiating(this.visits, bool);
  }

  changeInput($event) {
    this.inputCode = $event.target.value;
    console.log(this.inputCode);
  }

  setComment(reg_id, body) {
    this.showLoading();
    this.insuranceService.setComments(reg_id, body).subscribe(
      (res) => {
        console.log(res);
        this.insuranceService
          .getInsuranceRegister(this.insuId)
          .subscribe(
            (res) => {
              this.loading.dismiss();
              this.inputCode = "";
              this.visits = res["data"][this.registerKey].visits;
              this.initiating(this.visits, false);
            },
            (err) => {
              this.loading.dismiss();
              this.presentAlert(
                "Error",
                "Hubo un error al realizar esta acción. Intente nuevamente.",
                "Aceptar"
              );
              console.error(err);
            }
          );
      },
      error => {
        this.loading.dismiss();
        this.presentAlert(
          "Error",
          "Hubo un error al realizar esta acción. Intente nuevamente.",
          "Aceptar"
        );
      }
    );
  }

  handleEditing(insu_id, bool) {
    this.changeEdit(insu_id, bool);
    if (this.inputCode) {
      this.setComment(insu_id, this.inputCode);
    }
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
