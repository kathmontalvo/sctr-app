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
    "Content-type": "application/json"
  });

  login(email: string, password: string): Observable<any> {
    const url = "login-url";
    return this.http
      .post(
        url,
        { email: email, password: password },
        { headers: this.headers }
      )
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

  setToken(token): void {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  logOutUser(): void {
    localStorage.removeItem("token");
  }
}
