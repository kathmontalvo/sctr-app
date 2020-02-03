import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  userInfo: object;
  file: File;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userInfo = this.authService.getObject("user");
  }

  async changeListener($event) {
    console.log($event);
    this.file = await $event.target.files[0];
    this.saveProfilePhoto(this.file);
  }
  updateUserPhoto(file) {
    this.authService.destroy("user");
    this.userService.updateUser(file).subscribe(res => {
      console.log(res["data"]);
      this.authService.setObject("user", res["data"]);
    });
  }
  saveProfilePhoto(file) {
    this.userService.uploadImage(file).subscribe(res => {
      console.log(res["data"]);
      this.updateUserPhoto(res["data"]);
    });
  }
}
