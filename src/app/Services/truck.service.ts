import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  uri = 'http://localhost:4000'
  authToken: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loadToken(){
    const token = this.cookieService.get('id_token');
    this.authToken = token;
  }

  getTruck(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/trucks`,{headers: header});
  }

  addTruck(driverName,phone,licPlate,carrCapacity){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const truck = {
      driverName : driverName,
      phone: phone,
      licPlate: licPlate,
      carrCapacity: carrCapacity
    }
    return this.http.post(`${this.uri}/trucks/add`, truck,{headers: header});
  }

  getTruckById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/trucks/${id}`,{headers: header});
  }

  updateTruck(id, driverName,phone,licPlate,carrCapacity){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const truck = {
      driverName : driverName,
      phone: phone,
      licPlate: licPlate,
      carrCapacity: carrCapacity
    }
    return this.http.post(`${this.uri}/trucks/update/${id}`, truck,{headers: header});
  }

  deleteTruck(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/trucks/delete/${id}`,{headers: header});
  }
}