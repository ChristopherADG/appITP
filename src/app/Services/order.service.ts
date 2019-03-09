import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  uri = 'http://localhost:4000'
  authToken: any;

  constructor(private http: HttpClient) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
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
    return JSON.parse(localStorage.getItem('user'));
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

  getOrderById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/orders/${id}`,{headers: header});
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
