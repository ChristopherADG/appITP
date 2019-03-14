import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  uri = 'http://localhost:4000'
  authToken: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loadToken(){
    const token = this.cookieService.get('id_token');
    this.authToken = token;
  }

  getOrders(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/orders`,{headers: header});
  }

  getUser(){
    return JSON.parse(this.cookieService.get('user'));
  } 
  
  addOrder(dinningRoom,description,products,status){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const order = {
      user: this.getUser(),
      dinningRoom: dinningRoom,
      description: description,
      products: products,
      status: status
    }
    return this.http.post(`${this.uri}/orders/add`, order,{headers: header});
  }

  approveOrder(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.post(`${this.uri}/orders/approve/${id}`,null,{headers: header});
  }

  denyOrder(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.post(`${this.uri}/orders/deny/${id}`,null,{headers: header});
  }

  getOrderById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/orders/${id}`,{headers: header});
  }
  getOrdersByStatus(status){
    //console.log(status)
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/orders/status/${status}`,{headers: header});
  }

  updateDinningRoom(id, dinningRoom,description,products,status){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const order = {
      user: this.getUser(),
      dinningRoom: dinningRoom,
      description: description,
      products: products,
      status: status
    }
    return this.http.post(`${this.uri}/orders/update/${id}`, order,{headers: header});
  }

  deleteDinningRoom(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/orders/delete/${id}`,{headers: header});
  }
}
