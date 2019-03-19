import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  uri = 'http://localhost:4000'
  authToken: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loadToken(){
    const token = this.cookieService.get('id_token');
    this.authToken = token;
  }

  getShippings(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/shippings`,{headers: header});
  }

  addShipping(driverName,products,destiny){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const shipping = {
      driverName : driverName,
      products: products,
      destiny: destiny
    }
    return this.http.post(`${this.uri}/shippings/add`, shipping,{headers: header});
  }

  getShippingById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/shippings/${id}`,{headers: header});
  }

  updateShipping(id, driverName,products,destiny){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const shipping = {
      driverName : driverName,
      products: products,
      destiny: destiny
    }
    return this.http.post(`${this.uri}/shippings/update/${id}`, shipping,{headers: header});
  }

  deleteShipping(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/shippings/delete/${id}`,{headers: header});
  }

  approveOrder(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.post(`${this.uri}/shippings/approve/${id}`,null,{headers: header});
  }
}