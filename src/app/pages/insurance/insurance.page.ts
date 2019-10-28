import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.page.html",
  styleUrls: ["./insurance.page.scss"]
})
export class InsurancePage implements OnInit {
  segment: string;
  userInfo: object;
  sctrType: object;
  users: object[];
  companies: object[];

  constructor(public popOverCtrl: PopoverController) {}

  ngOnInit() {
    this.segment = "details";
    this.userInfo = {
      name: "Juan Perez",
      img:
        "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"
    };
    this.sctrType = {
      name: "SCTR Tipo 1"
    };
    this.users = [
      {
        name: "Ana Ramos",
        img:
          "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1",
        dateInit: "2/04/19",
        dateEnd: "30/04/19"
      },
      {
        name: "Juan Lopez",
        img:
          "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1",
        dateInit: "2/04/19",
        dateEnd: "30/04/19"
      },
      {
        name: "Italo Ramirez",
        img:
          "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1",
        dateInit: "2/04/19",
        dateEnd: "30/04/19"
      },
      {
        name: "Jair Meneses",
        img:
          "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1",
        dateInit: "2/04/19",
        dateEnd: "30/04/19"
      }
    ];
    this.companies = [
      {
        name: "Backus",
        place: "Ate",
        img:
          "https://s3.amazonaws.com/www.laborum.pe/lb_companies/r/xpo/photos/83901/tom-parker-oneredeye-0875.jpg",
        register: [
          {
            date: "11/04/19",
            entry: "7:51",
            exit: "8:51"
          },
          {
            date: "11/05/19",
            entry: "7:51",
            exit: "8:51"
          }
        ]
      },
      {
        name: "Gloria",
        place: "Ate",
        img:
          "https://s3.amazonaws.com/www.laborum.pe/lb_companies/r/xpo/photos/83901/tom-parker-oneredeye-0875.jpg",
        register: [
          {
            date: "11/04/19",
            entry: "7:51",
            exit: "8:51"
          },
          {
            date: "11/05/19",
            entry: "7:51",
            exit: "8:51"
          }
        ]
      },
      {
        name: "Ramsa",
        place: "Callao",
        img:
          "https://s3.amazonaws.com/www.laborum.pe/lb_companies/r/xpo/photos/83901/tom-parker-oneredeye-0875.jpg",
        register: [
          {
            date: "11/04/19",
            entry: "7:51",
            exit: "8:51"
          },
          {
            date: "11/05/19",
            entry: "7:51",
            exit: "8:51"
          }
        ]
      }
    ];
    this.generateQRCode();
  }

  async openRegister(ev: any) {
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  qrcodename: string = "asap";
  title = "generate-qrcode";
  elementType: "url" | "canvas" | "img" = "url";
  value: string;
  display = true;
  href: string;
  generateQRCode() {
    // if (this.qrcodename == "") {
    //   this.display = false;
    //   alert("Please enter the name");
    //   return;
    // } else {
    this.value = this.qrcodename;
    this.display = true;
    // }
  }
  downloadImage() {
    this.href = document.getElementsByTagName("img")[1].src;
  }
}
