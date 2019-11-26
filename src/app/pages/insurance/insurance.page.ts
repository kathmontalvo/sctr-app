import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { ActivatedRoute } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.page.html',
  styleUrls: ['./insurance.page.scss']
})
export class InsurancePage implements OnInit {
  segment: string;
  sctrType: object;
  users: object[];
  companies: object[];
  insuranceId: number;
  insuranceInfo: object;
  qrcodename: string = 'asap';
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = true;
  pdfFile: string;
  fileUrl;
  protectedUrl: SafeUrl;
  user;

  constructor(public popOverCtrl: PopoverController, private route: ActivatedRoute, private insuranceService: InsuranceService, private sanitizer: DomSanitizer, private authService: AuthService) {
    setTimeout(() => {
      this.protectedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.pdfFile);
      console.log(this.protectedUrl);
    }, 2000);
  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.insuranceId = id;
    console.log(this.insuranceId, typeof id);
    this.getInsuranceData();
    this.user = this.authService.getObject('user');

    this.segment = 'details';

    this.sctrType = {
      name: 'SCTR Tipo 1'
    };
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
    this.generateQRCode();
    const file = new Blob([this.pdfFile], { type: 'application/pdf' });
    this.fileUrl = URL.createObjectURL(file);
    this.protectedUrl = this.sanitizer.bypassSecurityTrustUrl(this.fileUrl);
  }

  async openRegister(ev: any) {
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: ev,
      cssClass: 'popover-style',
      translucent: true
    });
    return await popover.present();
  }

  getInsuranceData() {
    this.insuranceService.getUserInsurance(this.insuranceId).subscribe(
      response => {
        console.log(response);
        this.insuranceInfo = response['data'];
        this.qrcodename = this.insuranceInfo['code'];
        this.pdfFile = this.insuranceInfo['document'];
        this.users = this.insuranceInfo['insu_users'];
      },
      error => {
        console.log(error, 'ghjkasdjasd');
        alert('Error al obtener datos del documento.');
      }
    );
  }

  generateQRCode() {
    this.value = this.qrcodename;
    this.display = true;
  }
}
