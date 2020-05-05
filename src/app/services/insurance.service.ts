import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class InsuranceService {
  data: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  headers: HttpHeaders = new HttpHeaders({
    Authorization: "Bearer " + this.authService.getItem("access_token"),
    Accept: "application/json, text/plain"
  });

  getInsurances() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/user/home";
    return (this.data = this.http.get(url, { headers: headers }));
  }

  getUserInsurance(insured_id: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/user/insurence";
    return this.http.post(url, { insured_id }, { headers: headers }).pipe(
      map(data => {
        return data;
      })
    );
  }
  getInsuranceRegister(insured_id: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/user/history";
    return this.http.post(url, { insured_id }, { headers: headers }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getGraphic() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/user/graphic";
    return (this.data = this.http.get(url, { headers: headers }));
  }

  postRegister(insurence_id, plant_id, body, date, from, type) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.getItem("access_token"),
      // Accept: "application/json, text/plain"
    })
    const url = "http://adm.sctr-insured.com.pe/api/user/add/history";
    return this.http.post(url, {insurence_id, plant_id, body, date, from, type}, {headers:headers}).pipe(
      map(data => {
        return data;
      })
    )
  }

  setComments(register_id, body){
    const formHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.authService.getItem("access_token"),
    }); 

    const fd = new FormData();
    fd.append("register_id", register_id);
    fd.append("body", body);

    const url = "http://adm.sctr-insured.com.pe/api/user/comment";
    
    return this.http.post(url, fd, { headers: formHeaders }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
