import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  data: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getItem('access_token')
  });

  getInsurances() {
    const url = 'http://adm.sctr-insured.com.pe/api/user/home';
    return (this.data = this.http.get(url, { headers: this.headers }));
  }
  
  getUserInsurance(insured_id: number){
    const url = 'http://adm.sctr-insured.com.pe/api/user/insurence';
    return this.http
      .post(url, { insured_id }, { headers: this.headers })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
