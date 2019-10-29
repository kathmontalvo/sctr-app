import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}
  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getItem('access_token')
  });

  getUser() {
    const url = 'http://adm.sctr-insured.com.pe/api/oauth/current/user';
    return this.http.post(url, {}, { headers: this.headers }).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
}
