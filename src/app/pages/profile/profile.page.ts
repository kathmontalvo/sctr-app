import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  userInfo: object;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userInfo = this.authService.getObject('user').data;
    // this.userInfo = {
    //   name: 'Juan Perez',
    //   img: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1'
    // };
  }
}
