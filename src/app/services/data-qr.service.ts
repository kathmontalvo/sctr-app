import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataQrService {
  data: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getItem('access_token')
  });

  getData() {
    const url = 'URL_AQUÍ';
    return (this.data = this.http.get(url, { headers: this.headers }));
  }
}
