import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent implements OnInit {
  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService
  ) {}
  visits: object[];
  fromHour;
  toHour;
  bodyNow;
  today;

  ngOnInit() {
    this.visits = this.authService.getObject("visits");
    const lastEl = this.visits.length - 1;
    this.today = this.visits[lastEl];
    console.log(this.dateStr);
    console.log(this.today);
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }

  d = new Date();

  date = ("0" + this.d.getDate()).slice(-2);
  month = ("0" + (this.d.getMonth() + 1)).slice(-2); // Since getMonth() returns month from 0-11 not 1-12
  year = this.d.getFullYear();

  dateStr = this.date + "/" + this.month + "/" + this.year;
  
}
