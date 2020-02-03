import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent implements OnInit {
  constructor(private popoverCtrl: PopoverController, private authService: AuthService) {}
  visits: object[];

  ngOnInit() {
    this.visits = this.authService.getObject("visits");
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }
}
