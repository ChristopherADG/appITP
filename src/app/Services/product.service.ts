import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://localhost:4000'

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  authToken: any;

  loadToken(){
    const token = this.cookieService.get('id_token');
    this.authToken = token;
  }

  getUnits(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/units`,{headers: header});
  }

  addUnit(name){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const unit = {
      name: name
    }
    return this.http.post(`${this.uri}/units/add`, unit,{headers: header});
  }

  deleteUnit(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/units/delete/${id}`,{headers: header});
  }

  getCategory(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/categories`,{headers: header});
  }

  addCategory(name){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const unit = {
      name: name
    }
    return this.http.post(`${this.uri}/categories/add`, unit,{headers: header});
  }

  deleteCategory(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/categories/delete/${id}`,{headers: header});
  }


  getProducts(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/products`,{headers: header});
  }

  addProduct(name,unit,category, description){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const product = {
      name: name,
      unity: unit,
      category: category,
      description: description
    }
    return this.http.post(`${this.uri}/products/add`, product,{headers: header});
  }

  getProductById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/products/${id}`,{headers: header});
  }


  updateProduct(id,name,unit,category, description){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const product = {
      name: name,
      unity: unit,
      category: category,
      description: description
    }
    return this.http.post(`${this.uri}/products/update/${id}`, product,{headers: header});
  }

  deleteProduct(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/products/delete/${id}`,{headers: header});
  }
}
