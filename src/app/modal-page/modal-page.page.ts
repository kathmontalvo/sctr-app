import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss']
})
export class ModalPagePage implements OnInit {
  constructor(public viewCtrl: ViewController) {}

  ngOnInit() {}

  closeModal() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    // console.log(this.navParams.get('message'));
  }
}
