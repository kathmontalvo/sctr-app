import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.page.html',
  styleUrls: ['./insurance.page.scss']
})
export class InsurancePage implements OnInit {
  userInfo: object;
  sctrType: object;
  users: object[];
  companies: object[];
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.userInfo = {
      name: 'Juan Perez',
      img: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1'
    };
    this.sctrType = {
      name: 'SCTR Tipo 1'
    };
    this.users = [
      {
        name: 'Ana Ramos',
        img: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1',
        dateInit: '2/04/19',
        dateEnd: '30/04/19'
      },
      {
        name: 'Juan Lopez',
        img: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1',
        dateInit: '2/04/19',
        dateEnd: '30/04/19'
      },
      {
        name: 'Italo Ramirez',
        img: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1',
        dateInit: '2/04/19',
        dateEnd: '30/04/19'
      },
      {
        name: 'Jair Meneses',
        img: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1',
        dateInit: '2/04/19',
        dateEnd: '30/04/19'
      }
    ];
    this.companies = [
      {
        name: 'Backus',
        place: 'Ate',
        img: 'https://s3.amazonaws.com/www.laborum.pe/lb_companies/r/xpo/photos/83901/tom-parker-oneredeye-0875.jpg',
        register: [
          {
            date: '11/04/19',
            entry: '7:51',
            exit: '8:51'
          },
          {
            date: '11/05/19',
            entry: '7:51',
            exit: '8:51'
          }
        ]
      },
      {
        name: 'Gloria',
        place: 'Ate',
        img: 'https://s3.amazonaws.com/www.laborum.pe/lb_companies/r/xpo/photos/83901/tom-parker-oneredeye-0875.jpg',
        register: [
          {
            date: '11/04/19',
            entry: '7:51',
            exit: '8:51'
          },
          {
            date: '11/05/19',
            entry: '7:51',
            exit: '8:51'
          }
        ]
      },
      {
        name: 'Ramsa',
        place: 'Callao',
        img: 'https://s3.amazonaws.com/www.laborum.pe/lb_companies/r/xpo/photos/83901/tom-parker-oneredeye-0875.jpg',
        register: [
          {
            date: '11/04/19',
            entry: '7:51',
            exit: '8:51'
          },
          {
            date: '11/05/19',
            entry: '7:51',
            exit: '8:51'
          }
        ]
      }
    ];
  }

  openModal() {}
}
