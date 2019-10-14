import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.page.html",
  styleUrls: ["./insurance.page.scss"]
})
export class InsurancePage implements OnInit {
  userInfo: object;
  sctrType: object;
  constructor() {}

  ngOnInit() {
    this.userInfo = {
      name: "Juan Perez",
      img:
        "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"
    };
    this.sctrType = {
      name: "SCTR Tipo 1"
    };
  }
}
