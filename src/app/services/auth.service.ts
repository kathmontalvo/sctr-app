import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  login(
    grant_type: string,
    client_id: string,
    client_secret: string,
    username: string,
    password: string
  ): Observable<any> {
    const url = "http://adm.sctr-insured.com.pe/api/oauth/token";
    return this.http
      .post(url, { grant_type, client_id, client_secret, username, password })
      .pipe(
        map(data => {
          console.log(data);
          return data;
        })
      );
  }
  register(email: string, password: string): Observable<any> {
    const url = "URL_REGISTRR";
    return this.http
      .post(url, { email, password }, { headers: this.headers })
      .pipe(data => {
        console.log(data);
        return data;
      });
  }

  setItem(key, value): void {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  setObject(key, obj): void {
    const value = JSON.stringify(obj);
    localStorage.setItem(key, value);
  }

  getObject(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  logOutUser(): void {
    localStorage.removeItem("access_token");
  }
}
